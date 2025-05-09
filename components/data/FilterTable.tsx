"use client";

import {
  ResponsePackages,
  ResponseScales,
  ResponseWeights,
  TableWeights,
} from "@/lib/definition";
import FormFilter from "./formFilter";
import { WeightsTableSkeleton } from "../skeletons/skeletons";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Table from "@/components/data/table";
import Pagination from "../navigation/pagination";
import {
  realTimeWeights_to_ResponseWeights,
  tableWeights,
} from "@/lib/dataMapper";

export default function FilterTable({
  oldWeights,
  currentPage,
  scales,
  packages,
  totalPages,
}: {
  oldWeights: ResponseWeights[];
  currentPage: number;
  scales: ResponseScales[];
  packages: ResponsePackages[];
  totalPages: number;
}) {
  const [packagesSelected, setPackagesSelected] = useState<ResponsePackages[]>(
    []
  );
  const [scalesSelected, setScalesSelected] = useState<ResponseScales[]>([]);
  const [init, setInit] = useState<Date>(new Date(0));
  const [end, setEnd] = useState<Date>(new Date());
  const [limit, setLimit] = useState<number>(1000);
  const [weights, setWeights] = useState<TableWeights[]>(
    tableWeights(oldWeights, packages, scales)
  );
  const [sortVariable, setSortVariable] = useState<string>("Id");
  const [sortOrder, setSortOrder] = useState<string>("Desc");
  const [refresh, setRefresh] = useState<boolean>(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const refreshRef = useRef(refresh);

  const [refreshEnd, setRefreshEnd] = useState<boolean>(true);
  const endRef = useRef<Date>(new Date());

  const firstEndRef = useRef<Date | null>(new Date(end));

  useEffect(() => {
    if (!refreshEnd) return;

    const interval = setInterval(() => {
      endRef.current = new Date();
      setEnd(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshEnd]);

  function updateRefresh(value: boolean) {
    setRefresh(value);
  }

  const optionalSorter = useCallback(
    (weight1: ResponseWeights, weight2: ResponseWeights) => {
      let res = 0;
      if (sortVariable === "Fecha") {
        res =
          weight1.date_time < weight2.date_time
            ? -1
            : weight1.date_time > weight2.date_time
            ? 1
            : 0;
      }
      if (sortVariable === "Envases") {
        res = weight1.package_id - weight2.package_id;
      }
      if (sortVariable === "Peso Inicial") {
        res = weight1.initial_weight - weight2.initial_weight;
      }
      if (sortVariable === "Peso Final") {
        res = weight1.final_weight - weight2.final_weight;
      }
      if (sortVariable === "Balanzas") {
        res = weight1.scale_id - weight2.scale_id;
      }
      if (sortVariable === "Id") {
        res = weight1.id - weight2.id;
      }
      if (sortOrder === "Desc") {
        res *= -1;
      }
      return res;
    },
    [sortVariable, sortOrder]
  );

  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);

  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:8000/sse");

    eventSource.onopen = function () {
      console.log("Connection to server opened");
    };

    eventSource.addEventListener("newWeights", function (event) {
      let data = event.data.replace(/'/g, '"');
      data = data.replace(
        /datetime\.datetime\((\d+), (\d+), (\d+), (\d+), (\d+)\)/g,
        '"$1-$2-$3T$4:$5:00"'
      );
      console.log("Data received from server: ", JSON.parse(data));
      // console.log("Data received");
      const weights = realTimeWeights_to_ResponseWeights(JSON.parse(data));
      if (refreshRef.current) {
        const newWeights = tableWeights(weights, packages, scales)
          .filter((weight) =>
            optionalFilter(
              weight,
              init.toISOString(),
              endRef.current.toISOString(),
              packagesSelected.map((package_) => package_.package_id),
              scalesSelected.map((scale) => scale.scale_id)
            )
          )
          .sort(optionalSorter)
          .slice(0, limit);
        setWeights(newWeights);
        setLastRefresh(new Date());
      }
    });

    return () => {
      eventSource.close();
    };
  }, [
    packages,
    scales,
    init,
    limit,
    optionalSorter,
    packagesSelected,
    scalesSelected,
  ]);

  function optionalFilter(
    weight: ResponseWeights,
    init: string,
    end: string,
    packages_id: number[],
    scales_id: number[]
  ) {
    const parseInit = new Date(init);
    const parseEnd = new Date(end);
    const date_time = new Date(weight.date_time);
    if (init !== "" && parseInit > date_time) return false;
    if (end !== "" && parseEnd < date_time) return false;
    if (packages_id.length > 0 && !packages_id.includes(weight.package_id))
      return false;
    if (scales_id.length > 0 && !scales_id.includes(weight.scale_id))
      return false;
    return true;
  }

  function getFilteredWeights(
    limitSelected: number,
    initSelected: string,
    endSelected: string,
    packagesSelected: ResponsePackages[],
    scalesSelected: ResponseScales[],
    sortVariable: string,
    sortOrder: string
  ) {
    if (initSelected === "") initSelected = new Date(0).toISOString();
    if (endSelected === "") endSelected = new Date().toISOString();
    if (endSelected != firstEndRef.current?.toISOString()) {
      setRefreshEnd(false);
    }
    setPackagesSelected(packagesSelected);
    setScalesSelected(scalesSelected);
    setInit(new Date(initSelected));
    setEnd(new Date(endSelected));
    setLimit(limitSelected);
    setSortVariable(sortVariable);
    setSortOrder(sortOrder);
    const packages_id = packagesSelected.map((package_) => package_.package_id);
    const scales_id = scalesSelected.map((scale) => scale.scale_id);
    if (refresh) {
      setWeights(
        tableWeights(oldWeights, packages, scales)
          .filter((weight) =>
            optionalFilter(
              weight,
              initSelected,
              endSelected,
              packages_id,
              scales_id
            )
          )
          .sort(optionalSorter)
          .slice(0, limitSelected)
      );
    }
  }

  function resetFilters() {
    setPackagesSelected([]);
    setScalesSelected([]);
    setInit(new Date(0));
    setEnd(new Date());
    setLimit(1000);
    setWeights(tableWeights(oldWeights, packages, scales));
    setSortVariable("Id");
    setSortOrder("Desc");
    setRefresh(true);
    setRefreshEnd(true);
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-row">
        <h4 className="text-g bg-gray-100 rounded-l-md text-black px-6 py-4">
          Filtros
        </h4>
        <div className="w-px bg-gray-200" />
        <FormFilter
          packages={packages}
          scales={scales}
          limitSelectedAnt={limit}
          initSelectedAnt={init}
          endSelectedAnt={end}
          packagesSelectedAnt={packagesSelected}
          scalesSelectedAnt={scalesSelected}
          onUpdate={getFilteredWeights}
          onReset={resetFilters}
          sortVariableSelectedAnt={sortVariable}
          sortOrderAnt={sortOrder}
          resfreshAnt={refresh}
          lastRefresh={lastRefresh}
          onUpdateRefresh={updateRefresh}
        />
      </div>
      <div className="w-full border m-2" />
      <Suspense key={currentPage} fallback={<WeightsTableSkeleton />}>
        <Table weights={weights} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
