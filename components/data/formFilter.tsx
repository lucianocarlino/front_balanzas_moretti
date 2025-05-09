"use client";

import { useEffect, useState } from "react";
import { Checkbox, Dropdown, MenuProps, ConfigProvider } from "antd";
import { ResponsePackages, ResponseScales } from "@/lib/definition";
import { Button } from "../utils/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function FormFilter({
  packages,
  scales,
  scalesSelectedAnt,
  packagesSelectedAnt,
  initSelectedAnt,
  endSelectedAnt,
  limitSelectedAnt,
  onUpdate,
  onReset,
  sortVariableSelectedAnt,
  sortOrderAnt,
  resfreshAnt,
  lastRefresh,
  onUpdateRefresh,
}: {
  packages: ResponsePackages[];
  scales: ResponseScales[];
  scalesSelectedAnt: ResponseScales[];
  packagesSelectedAnt: ResponsePackages[];
  initSelectedAnt: Date;
  endSelectedAnt: Date;
  limitSelectedAnt: number;
  onUpdate: (
    limit: number,
    init: string,
    end: string,
    packages: ResponsePackages[],
    scales: ResponseScales[],
    sortVariable: string,
    sortOrder: string
  ) => void;
  onReset: () => void;
  sortVariableSelectedAnt: string;
  sortOrderAnt: string;
  resfreshAnt: boolean;
  lastRefresh: Date;
  onUpdateRefresh: (value: boolean) => void;
}) {
  const [scalesSelected, setScalesSelected] = useState<ResponseScales[]>([]);
  const [packagesSelected, setPackagesSelected] = useState<ResponsePackages[]>(
    []
  );
  const [limitSelected, setLimitSelected] = useState<number>(limitSelectedAnt);
  const [initSelected, setInitSelected] = useState<Date>(initSelectedAnt);
  const [endSelected, setEndSelected] = useState<Date>(endSelectedAnt);
  const [sortVariableSelected, setSortVariableSelected] = useState<string>(
    sortVariableSelectedAnt
  );
  const [sortOrderSelected, setSortOrderSelected] =
    useState<string>(sortOrderAnt);
  const [refreshSelected, setRefreshSelected] = useState<boolean>(resfreshAnt);

  const variables = [
    "Balanzas",
    "Envases",
    "Fecha",
    "Peso inicial",
    "Peso final",
    "Id",
  ];
  const sortOrderOptions = ["Asc", "Desc"];

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setScalesSelected(scalesSelectedAnt);
    setPackagesSelected(packagesSelectedAnt);
    setInitSelected(initSelectedAnt);
    setEndSelected(endSelectedAnt);
    setLimitSelected(limitSelectedAnt);
    setSortVariableSelected(sortVariableSelectedAnt);
    setSortOrderSelected(sortOrderAnt);
    setRefreshSelected(resfreshAnt);
  }, []);

  const itemScale: MenuProps["items"] = scales.map((scale) => ({
    key: scale.scale_id,
    label: (
      <Checkbox
        checked={scalesSelected.includes(scale)}
        onChange={(e) => {
          const newList = e.target.checked
            ? [...scalesSelected, scale]
            : scalesSelected.filter((item) => item !== scale);
          setScalesSelected(newList);
        }}
      >
        {scale.name}
      </Checkbox>
    ),
  }));

  const itemPackage: MenuProps["items"] = packages.map((package_) => ({
    key: package_.package_id,
    label: (
      <Checkbox
        checked={packagesSelected.includes(package_)}
        onChange={(e) => {
          const newList = e.target.checked
            ? [...packagesSelected, package_]
            : packagesSelected.filter((item) => item !== package_);
          setPackagesSelected(newList);
        }}
      >
        {package_.name}
      </Checkbox>
    ),
  }));

  const itemVariable: MenuProps["items"] = variables.map((variable) => ({
    key: variable,
    label: (
      <Checkbox
        checked={variable === sortVariableSelected}
        onChange={() => {
          setSortVariableSelected(variable);
        }}
      >
        {variable}
      </Checkbox>
    ),
  }));

  const itemOrder: MenuProps["items"] = sortOrderOptions.map((order) => ({
    key: order,
    label: (
      <Checkbox
        checked={order === sortOrderSelected}
        onChange={() => {
          setSortOrderSelected(order);
        }}
      >
        {order}
      </Checkbox>
    ),
  }));

  const updateFilters = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setRefreshSelected(false);
    onUpdate(
      limitSelected,
      initSelected.toISOString(),
      endSelected.toISOString(),
      packagesSelected,
      scalesSelected,
      sortVariableSelected,
      sortOrderSelected
    );
  };

  const resetFilters = () => {
    onReset();
  };

  const updateRefresh = (value: boolean) => {
    onUpdateRefresh(value);
    setRefreshSelected(value);
  };

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <form className="w-full" onSubmit={updateFilters}>
        <div className="w-full flex flex-col">
          <div className="rounded-tr-md bg-gray-100 p-2 md:p-2 flex flex-row justify-between w-full">
            <div className="ml-2 flex flex-row">
              <label
                className="my-2 block text-l font-medium text-black"
                htmlFor="limit"
              >
                Limite:
              </label>
              <div className="relative">
                <input
                  className="w-[60px] rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 text-black"
                  type="number"
                  name="limit"
                  id="limit"
                  defaultValue={limitSelected}
                  onChange={(e) =>
                    setLimitSelected(parseInt(e.target.value, 10))
                  }
                />
              </div>
            </div>
            <div className="ml-2 flex flex-row">
              <label
                className="my-2 block text-l font-medium text-black "
                htmlFor="desde"
              >
                Desde:
              </label>
              <div className="relative w-28">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 text-black"
                  type="date"
                  name="desde"
                  id="desde"
                  defaultValue={formatDate(initSelected)}
                  onChange={(e) => setInitSelected(new Date(e.target.value))}
                />
              </div>
            </div>
            <div className="ml-2 flex flex-row">
              <label
                className="my-2 block text-l font-medium text-black"
                htmlFor="hasta"
              >
                Hasta:
              </label>
              <div className="relative w-28">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 text-black"
                  type="date"
                  name="hasta"
                  id="hasta"
                  defaultValue={formatDate(endSelected)}
                  onChange={(e) => setEndSelected(new Date(e.target.value))}
                />
              </div>
            </div>
            <div className="ml-2 flex flex-row">
              <Dropdown
                menu={{ items: itemScale, selectable: true }}
                trigger={["click"]}
                className="rounded-md border bg-white border-gray-200 py-2 px-5 text-sm outline-2 placeholder:text-gray-500 text-black"
              >
                {`Balanzas: ${scalesSelected.length}`}
              </Dropdown>
            </div>
            <div className="ml-2 flex flex-row">
              <Dropdown
                menu={{ items: itemPackage, selectable: true }}
                trigger={["click"]}
                className="rounded-md border bg-white border-gray-200 py-2 px-5 text-sm outline-2 placeholder:text-gray-500 text-black"
              >
                {`Envases: ${packagesSelected.length}`}
              </Dropdown>
            </div>
            <div className="ml-2 flex flex-row">
              <label className="my-2 block text-l font-medium text-black">
                Ordenar por:
              </label>
              <div className="flex flex-row w-24">
                <Dropdown
                  menu={{ items: itemVariable }}
                  trigger={["click"]}
                  className="rounded-md border bg-white border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 text-black w-full"
                >
                  {sortVariableSelected}
                </Dropdown>
              </div>
              <div className="ml-2 flex flex-row w-[55px]">
                <Dropdown
                  menu={{ items: itemOrder }}
                  trigger={["click"]}
                  className="rounded-md border bg-white border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 text-black w-full"
                >
                  {sortOrderSelected}
                </Dropdown>
              </div>
            </div>
            <div className="ml-2 flex flex-row">
              <Button type="submit">
                <MagnifyingGlassIcon className="h-5 w-8" />
              </Button>
            </div>
            <div className="ml-2 flex flex-row">
              <Button type="button" onClick={resetFilters}>
                Borrar
              </Button>
            </div>
          </div>
          <div className="rounded-tr-md bg-gray-100 p-2 md:p-2 flex flex-row w-full justify-end">
            <div className="ml-2 flex flex-row">
              <label
                className="my-2 block text-xs text-black"
                htmlFor="lastRefresh"
              >
                Ultima actualización:
              </label>
              <div className="relative">
                <input
                  className="w-[120px] py-2 pl-2 text-xs outline-2 bg-gray-100 placeholder:text-gray-500 text-black"
                  type="text"
                  name="lastRefresh"
                  id="lastRefresh"
                  value={lastRefresh.toLocaleString("es-AR", {
                    timeZone: "America/Argentina/Buenos_Aires",
                  })}
                  readOnly
                />
              </div>
            </div>
            <div className="border-gray-400 border ml-2" />
            <div
              className={clsx("flex flex-row rounded-full px-2", {
                "bg-gray-100": refreshSelected,
                "bg-red-200": !refreshSelected,
              })}
            >
              <label
                className="my-2 block text-xs text-black"
                htmlFor="refreshSelected"
              >
                Actualizar:
              </label>
              <div className="relative">
                <input
                  className="w-[15px] my-2 pl-2 text-xs outline-2 bg-gray-100 placeholder:text-gray-500 text-black"
                  type="checkbox"
                  checked={refreshSelected}
                  onChange={(e) => updateRefresh(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </ConfigProvider>
  );
}
