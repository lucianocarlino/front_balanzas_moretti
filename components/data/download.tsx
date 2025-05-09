import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export function DownloadWeights() {
    return (
      <a
        href="http://127.0.0.1:8000/weights/download"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Descargar pesos</span>
        <ArrowDownTrayIcon className="h-5 md:ml-4" />
      </a>
    );
  }