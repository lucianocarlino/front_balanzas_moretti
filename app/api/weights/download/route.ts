// import { NextResponse } from "next/server";

// const BACKEND_URL = process.env.API_URL ?? "http://localhost:5000";

// export async function GET() {
//   const upstreamResponse = await fetch(`${BACKEND_URL}/weights/download`, {
//     method: "GET",
//     cache: "no-store",
//   });

//   if (!upstreamResponse.ok) {
//     return NextResponse.json(
//       { error: "No se pudo descargar el archivo" },
//       { status: upstreamResponse.status },
//     );
//   }

//   const headers = new Headers();
//   const contentType = upstreamResponse.headers.get("content-type");
//   const contentDisposition = upstreamResponse.headers.get("content-disposition");

//   if (contentType) {
//     headers.set("content-type", contentType);
//   }

//   if (contentDisposition) {
//     headers.set("content-disposition", contentDisposition);
//   }

//   return new Response(upstreamResponse.body, {
//     status: upstreamResponse.status,
//     headers,
//   });
// }
