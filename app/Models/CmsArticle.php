<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class CmsArticle extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
    use Sluggable;
    use \Rutorika\Sortable\SortableTrait;

	protected $table = 'cms_articles';
    protected $fillable = ['schema_id', 'parent_id', 'lang_id', 'title', 'metadata', 'slug', 'active'];
    protected static $sortableField = 'position';
    protected static $sortableGroupField = 'parent_id';
    protected $casts = [
        'metadata' => 'array',
    ];

    public $front_view = null;
    public $route_view = null;

    public function sluggable():array
    {
        return [
            'slug' => [
                'source' => 'ParentSlug'
            ]
        ];
    }

    public function getParentSlugAttribute() {
        $pslug=$this->parent!=NULL? $this->parent->slug.'_': '';
        return $pslug . $this->title;
    }

    public function parent()
    {
        return $this->belongsTo('App\Models\CmsArticle', 'parent_id');
    }

    public function lang()
    {
        return $this->belongsTo('App\Models\CmsLang', 'lang_id');
    }

    public function schema()
    {
        return $this->belongsTo('App\Models\CmsSchema', 'schema_id');
    }

    public function schemas()
    {
        return $this->hasMany('App\Models\CmsSchema', 'id', 'schema_id');
    }

    public function page_schemas()
    {
        return $this->hasMany('App\Models\CmsSchema', 'id', 'schema_id')
            ->where('type', 'PAGE')
            ->where('active', '1')
            ->orderBy('position');
    }

    public function children()
    {
        return $this->hasMany('App\Models\CmsArticle', 'parent_id', 'id')
        	->where('active', '1')
        	->orderBy('position');
    }

    public function submenu()
    {
        return $this->hasMany('App\Models\CmsArticle', 'parent_id', 'id')
			->whereIn('schema_id', \App\Models\CmsSchema::select('id')
				->where('type', 'PAGE')->get()->toArray()
				)
            ->where('active', '1')
        	->orderBy('position');
    }

    public function find_template($front_view)
    {
        return $this->hasOne('App\Models\CmsArticle', 'parent_id', 'id')
            ->whereHas('schemas', function ($query) use($front_view) {
                $query->where('front_view', $front_view);
            });
    }

    public function child_template($front_view)
    {
        return $this->hasMany('App\Models\CmsArticle', 'parent_id', 'id')
            ->whereHas('schemas', function ($query) use($front_view) {
                $query->where('front_view', $front_view);
            })
            ->where('active', '1')
            ->orderBy('position');
    }

}
