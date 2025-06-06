import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { MessageCircleHeart } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface PageProps{
  flash: {
    message?: string
  }
}

export default function Index() {

    const { flash } = usePage().props as PageProps
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
              <div>
                {flash.message && (
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
              <Link href={route('products.create')}><Button>Create a product</Button></Link>
            </div>
        </AppLayout>
    );
}
