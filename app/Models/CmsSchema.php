<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsSchema extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */

	use \Rutorika\Sortable\SortableTrait;

	protected $table = 'cms_schemas';
	protected $fillable = ['parent_id', 'group_id', 'name', 'fields', 'iterations', 'type', 'active'];

	protected static $sortableField = 'position';
	protected static $sortableGroupField = ['parent_id', 'parent_id'];

    protected $casts = [
        'fields' => 'array',
    ];

    public function parent()
    {
        return $this->hasOne('App\Models\CmsSchema', 'id', 'parent_id');
    }

}
