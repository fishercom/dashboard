<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsParameter extends Model
{
    use \Rutorika\Sortable\SortableTrait;

	protected $table = 'cms_parameters';
	protected $fillable = ['group_id', 'parent_id', 'name', 'value', 'metadata', 'active'];
    protected static $sortableField = 'position';
    protected static $sortableGroupField = 'group_id';
    protected $casts = [
        'metadata' => 'array',
    ];

    public function from_group($alias)
    {
        return $this->hasMany('App\Models\CmsParameter', 'group_id', 'id')
            ->whereIn('group_id', \App\Models\CmsParameterGroup::select('id')
                ->where('alias', $alias)->get()->toArray()
                )
            ->where('active', '1')
            ->orderBy('position');
    }

    public function parent()
    {
        return $this->belongsTo('App\Models\CmsParameterAlias', 'parent_id');
    }

    public function group()
    {
        return $this->belongsTo('App\Models\CmsParameterGroup', 'group_id');
    }

    public function children()
    {
        return $this->hasMany('App\Models\CmsParameterAlias', 'parent_id', 'id')
            ->where('active', '1')
            ->orderBy('position');
    }

}
