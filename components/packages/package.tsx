import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { UpdateButton } from '../utils/updateButton';
import { DeleteButton } from '../utils/deleteButton';

export function Package({
    package_id,
    name,
    expected_weight,
    minimum_weight,
    maximum_weight,
  }: {
    package_id: number;
    name: string,
    expected_weight: number,
    minimum_weight: number,
    maximum_weight: number,
  }) {

    return (
      <div className="flex flex-col w-100 m-auto my-3 border rounded-md p mx-3 border-zinc-700 bg-gray-50 snap-start">
        <div className="flex flex-row p-4 border justify-between">
          <div className='flex flex-row space-x-2'>
            <ArchiveBoxIcon className="w-5" />
            <h2 className="text-xl font-medium py-1 align-items-center">{name}</h2>
          </div>
          <div className='flex flex-row space-x-2'>
            <UpdateButton id={`${package_id}`} type='packages'/>
            <DeleteButton id={`${package_id}`} type='packages'/>
          </div>
        </div>
        <div className='flex flex-row p-4'>
          <div className="flex flex-col justify-center px-2">
            <p className="text-l font-medium truncate py-2 justify-start">Peso minimo </p>
            <p className="truncate rounded-xl bg-white px-2 py-2 text-center text-l">
              {minimum_weight}
            </p>
          </div>
          <div className="flex flex-col justify-center px-2">
            <p className="text-l font-medium truncate py-2 justify-start">Peso esperado</p>
            <p className="truncate rounded-xl bg-white px-2 py-2 text-center text-l">
              {expected_weight}
            </p>
          </div>
          <div className="flex flex-col justify-center px-2">
            <p className="text-l font-medium truncate py-2 justify-start">Peso maximo</p>
            <p className="truncate rounded-xl bg-white px-2 py-2 text-center text-l">
              {maximum_weight}
            </p>
          </div>
        </div>
      </div>
    );
  }