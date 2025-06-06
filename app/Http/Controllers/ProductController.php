<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render("Products/index", []);
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
}
