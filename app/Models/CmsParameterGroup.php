<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsParameterGroup extends Model {

	protected $table = 'cms_parameters_group';
    protected $fillable = ['name', 'alias', 'children', 'active'];

    public function parameters($lang_id=null, $parent_id=null)
    {
        return $this->hasMany('App\Models\CmsParameter', 'group_id', 'id')
            ->where(function ($query) use($lang_id, $parent_id) {
                if(!empty($parent_id))
                    $query->where('parent_id', $parent_id);
                else
                    $query->whereNull('parent_id');
            })
        	->where('active', '1')
        	->orderBy('position');
    }

}
