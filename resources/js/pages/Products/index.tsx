import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MessageCircleHeart } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

//declare interface because ProductController parse compact 
interface Product {
  id: number, 
  name: string, 
  price: number, 
  description: string
}

interface PageProps{
  flash: {
    message?: string
  }, 
  products: Product[]
}

export default function Index() {

    const { products, flash } = usePage().props as PageProps

    //useForm from inertia (imported above) 
    // Find out more, visit https://inertiajs.com/forms - form helper section
    const { processing, delete: destroy } = useForm();

    //function for delete button onClick - process delete button
    const handleDelete = (id: number, name: string) => {
      //alert('Do you want to delete?')
      //confirm delete with product values for verification 
      // make sdure to use '`' this symbol when there's a varible 
      if(confirm(`Do you want to delete product - ${id}. ${name}?`)){
        //call destroy from above, get uri from route name (web.php)
        destroy(route('products.destroy', id));
        //instead of below, incase the uri changes, this is why we add route names in the web.php file to prevent changing all instance when uri changes
        //destroy(`/products/${id}`);
      }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
              <div>
                {flash.message && (
                  // Shacn alert component https://ui.shadcn.com/docs/components/alert
                  <Alert>
                    <MessageCircleHeart  />
                    <AlertTitle>Notification</AlertTitle>
                    <AlertDescription>
                      {flash.message}
                    </AlertDescription>
                  </Alert>
              )}
              </div>
            </div>
            <div className='m-4'>
              <Link href={route('products.create')}><Button className="bg-primary text-white">Create a product</Button></Link>
            </div>
            {/* check there are products by checking length of product array */}
            {products.length > 0 && (
              <div className='m-4'>
                {/* Shacn table component https://ui.shadcn.com/docs/components/table */}
                <Table>
                  <TableCaption>A list of all products</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product id</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>£{product.price}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell className="text-center space-x-2">
                          <Link href={route('products.edit', product.id)}><Button className="bg-slate-500 hover:bg-slate-700 text-white">Edit</Button></Link>
                          {/* button disabled when processing 
                          onclick function calls function 'handleDelete' parsing product values used for confirming deletion */}
                          <Button disabled={processing} onClick={() => handleDelete(product.id, product.name)} className="bg-red-500 hover:bg-red-700 text-white">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}                    
                  </TableBody>
                </Table>
              </div>
            )}
        </AppLayout>
    );
}
