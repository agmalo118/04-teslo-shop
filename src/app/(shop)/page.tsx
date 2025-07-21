export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';


interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home(propsPromise: Promise<Props>) {
  const { searchParams } = await propsPromise;
  const { page } = searchParams;

  const paramPage = page ? parseInt(page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page: paramPage });


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