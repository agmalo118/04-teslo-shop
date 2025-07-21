export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";


interface SearchParams {
  page?: string;
}
interface Params {
  gender: string;
}

interface PageProps {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

export default async function GenderByPage({ params, searchParams }: PageProps) {
  const pr = await params;
  const sp = await searchParams;
  
  const { gender } = pr;
  const { page } = sp;

  const paramPage = page ? parseInt(page) : 1;
  
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page: paramPage, gender: gender as Gender, });
  
    if (products.length === 0) {
      redirect(`/gender/${gender}`);
    }
  

  const labels: Record<string,string> = {
    "men": "para Hombres",
    "women": "para Mujeres",
    "kid": "para Niños",
    "unisex": "para Todos"
  }

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <div>
      <Title
        title={`Artículos ${labels[gender]}` }
        subTitle="Todos los productos"
        className="" />
      
      <ProductGrid products={products.filter(m => m.gender === gender)} />
      
      <Pagination totalPages={totalPages}/>
    </div>
  );
}