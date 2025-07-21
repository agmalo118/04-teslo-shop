export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: string
  },
  searchParams: {
    page?: string;
  };
}

export default async function GenderByPage(propsPromise: Promise<Props>) {
  const { params, searchParams } = await propsPromise;
  
  const { gender } = params;
  const { page } = searchParams;

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