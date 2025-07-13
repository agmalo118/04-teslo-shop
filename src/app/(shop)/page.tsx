export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';


type Params = Promise<{ paramPage?: string }>


interface Props {
  searchParams: Params
}


export default async function Home({ searchParams }: Props) {
  const { paramPage } = await searchParams;
  
  const page = paramPage ? parseInt(paramPage) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });


  if (products.length === 0) {
    redirect('/');
  }


  return (
    <>
      <Title
        title="Tienda"
        subTitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />
    </>
  );
}