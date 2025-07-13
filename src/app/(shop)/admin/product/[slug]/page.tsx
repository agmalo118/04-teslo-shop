import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';

type Params = Promise<{ slug: string }>

interface Props {
  params: Params
}

export default async function ProductPage({ params }: Props) {

  const { slug } = await params;

  const [ product, categories ] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);
 

  // Todo: new
  if ( !product && slug !== 'new' ) {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

  return (
    <>
      <Title title={ title } />

      <ProductForm product={ product ?? {} } categories={ categories } />
    </>
  );
}