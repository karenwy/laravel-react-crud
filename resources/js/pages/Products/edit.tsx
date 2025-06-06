import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ShieldAlert  } from 'lucide-react';
import React from 'react';

//declare interface because ProductController parse compact 
interface Product {
  id: number, 
  name: string, 
  price: number, 
  description: string
}

interface Props {
  product: Product
}

export default function Edit({product} : Props) {

  const {data, setData, put, processing, errors } = useForm({
    name: product.name,
    price: product.price,
    description: product.description
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('products.update', product.id))
  }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Product', href: `/products/${product.id}/edit`}]}>
            <Head title="Edit product" />
            <div className='w-8/12 p-4'>
              <form onSubmit={handleUpdate} className='space-y-4'>
                {/* Display Error */}

                {Object.keys(errors).length > 0  && (
                  // Shacn alert component https://ui.shadcn.com/docs/components/alert
                  <Alert variant="destructive">
                    <ShieldAlert />
                    <AlertTitle>Errors</AlertTitle>
                    <AlertDescription>
                      <ul>
                        {Object.entries(errors).map(([key, message]) => (
                          <li key={key}>{message as string}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                <div className='gap-1.5'>
                  <Label htmlFor='product name'>Name</Label>
                  <Input placeholder='Product Name' value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                </div>
                <div className='gap-1.5'>
                  <Label htmlFor='product price'>Price</Label>
                  <Input placeholder='Price' value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                </div>
                <div className='gap-1.5'>
                  <Label htmlFor='product description'>Description</Label>
                  <Textarea placeholder='Description' value={data.description} onChange={(e) => setData('description', e.target.value)} />
                </div>
                <Button disabled={processing} type='submit'>Update Product</Button>
              </form>
            </div>
        </AppLayout>
    );
}
