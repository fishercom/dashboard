<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the main menu on sidebar dashboard.
     */
    public function index(Request $request): Response
    {
        $items = Profile::select()
        ->where(function($query) use($s){
            if(!empty($s)){
                $query->where('name', 'LIKE', '%'.str_replace(' ', '%', $s).'%');
            }
        })
        ->get();
        return Inertia::render('dashboard/profiles/index', [
            'items' => $items,
        ]);
    }
}
