<?php
namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Redirector;

use App\Models\CmsArticle;
use App\Models\CmsSite;
use DB;
use View;

class ArticleController extends AppController {

    /*
    |--------------------------------------------------------------------------
    | Article Controller
    |--------------------------------------------------------------------------
    |
    | This controller renders the "marketing page" for the application and
    | is configured to only allow guests. Like most of the other sample
    | controllers, you are free to modify or remove it as you desire.
    |
    */
    private $lang_id = 1;

    function __construct(Request $request)
    {
        if($request->lang_id) $this->lang_id = $request->lang_id;
    }

    function site(){

        $site = CmsSite::select()
                //->where('lang_id', $this->lang_id)
                ->whereNotNull('default')
                ->first();

        return $this->response($site);
    }

    function home(){

        $article = CmsArticle::select()
                ->whereHas('schema', function($query){
                    $query->where('front_view', 'home_page');
                })
                ->where('lang_id', $this->lang_id)
                ->first();
        if($article){
            $this->children($article);
        }

        return $this->response($article);
    }

    function header(){

        $article = CmsArticle::select()
                ->whereHas('schema', function($query){
                    $query->where('front_view', 'menu_header');
                })
                ->where('lang_id', $this->lang_id)
                ->first();
        if($article){
            $this->children($article);
        }

        return $this->response($article);
    }

    function footer(){

        $article = CmsArticle::select()
                ->whereHas('schema', function($query){
                    $query->where('front_view', 'menu_footer');
                })
                ->where('lang_id', $this->lang_id)
                ->first();
        if($article){
            $this->children($article);
        }

        return $this->response($article);
    }

    function pages(){

        $article = CmsArticle::select()
                ->whereHas('schema', function($query){
                    $query->where('front_view', 'menu_principal');
                })
                ->where('lang_id', $this->lang_id)
                ->first();
        if($article){
            $this->children($article);
        }

        return $this->response($article);
    }

    function page($slug){

        $article = CmsArticle::select()
                ->where('alias', $slug)
                ->first();
        if($article){
            $this->children($article);
        }

        return $this->response($article);
    }

    private function children(&$page){
        foreach($page->children as $article){
            $article['schema'] = $article->schema;
            $this->children($article);
        }
    }

}
