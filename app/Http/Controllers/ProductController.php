<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        // get all products from the product model
        $products = Product::all();
        //return product index page with all products
        return Inertia::render("Products/index", compact("products"));
    }

    public function create()
    {
        return Inertia::render("Products/create", []);
    }

    public function store(Request $request)
    {
        //dump($request);

        $request->validate([
            "name" => "required|string|max:255",
            "price" => "required|numeric",
            "Description" => "nullable|string",
        ]);

        // use product model create new product with all request/post data
        Product::create($request->all());

        //return to product index/home page
        return redirect()->route("products.index")->with("message", "Product created succesfully");
    }

    public function edit(Product $product)
    {
        return Inertia::render("Products/edit", compact("product"));
    }

    //request varible parsed here will get the data from the form input
    public function update(Request $request, Product $product)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "price" => "required|numeric",
            "Description" => "nullable|string",
        ]);

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description')
        ]);

        return redirect()->route('products.index')->with('message', 'Product updated sucessfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route("products.index")->with("message", "Product deleted sucessfully");
    }
}
