<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Exception;

class AppController extends Controller
{
    /**
     * Returns Error Response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function response($obj)
    {
        return response()->json($obj, 200);
    }

    /**
     * Returns Error Response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function message($message)
    {
        return response()->json(['message' => $message], 200);
    }

    /**
     * Returns Error Response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function error($message)
    {
        return response()->json(['message' => $message], 400);
    }
}
