export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";


interface SearchParams {
  page?: string;
  param: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function SearchByPage({ searchParams }: PageProps) {
  
  const sp = await searchParams;
  
  const { param, page } = sp;

  console.log(param)
  console.log(page)

  const paramPage = page ? parseInt(page) : 1;
  
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page: paramPage, search: param, });
  
  return (
    <div>
      <Title
        title={`Buscando "${param}"` }
        subTitle=""
        className="" />
      
      <ProductGrid products={products} />
      
      <Pagination totalPages={totalPages}/>
    </div>
  );
}