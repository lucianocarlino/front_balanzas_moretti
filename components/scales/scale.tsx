import { ScaleIcon } from '@heroicons/react/24/outline';
import { DeleteButton } from '../utils/deleteButton';
import { UpdateButton } from '../utils/updateButton';
import { ResponsePackages } from '@/lib/definition';

export function Scale({
    scale_id,
    name,
    slave_address,
    packages
  }: {
    scale_id: number;
    name: string;
    slave_address: number;
    packages: ResponsePackages[];
  }) {
  
    return (
      <div className="flex flex-col w-80 m-auto my-3 border rounded-md p mx-3 border-zinc-700 bg-gray-50 snap-start">
        <div className="flex flex-row p-4 border justify-between">
          <div className='flex flex-row space-x-2'>
            <ScaleIcon className="w-5" />
            <h2 className="text-xl font-medium py-1 align-items-center">{name}</h2>
          </div>
          <div className='flex flex-row space-x-2'>
            <UpdateButton id={`${scale_id}`} type='scales'/>
            <DeleteButton id={`${scale_id}`} type='scales'/>
          </div>
        </div>
        <div className='flex flex-col p-4'>
          <div className="flex flex-row justify-center px-2">
            <p className="text-l font-medium truncate py-2 justify-start">Identificador: </p>
            <p className="truncate rounded-xl px-2 py-2 text-center text-l">
              {name}
            </p>
          </div>
          <div className="flex flex-row justify-center px-2">
            <p className="text-l font-medium truncate py-2 justify-start">Direccion modbus: </p>
            <p className="truncate rounded-xl px-2 py-2 text-center text-l">
              {slave_address}
            </p>
          </div>
          <div className="flex flex-row justify-center px-2">
            <p className="text-l font-medium truncate py-2 justify-start">Paquetes: </p>
            {packages?.map((package_) =>
            <p
              key={package_.package_id}
              className="truncate rounded-xl px-2 py-2 text-center text-l"
            >
              {package_.name}
            </p>
            )}
          </div>
        </div>
      </div>
    );
  }