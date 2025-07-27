<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsDirectory extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_directories';
	protected $fillable = ['name', 'type_id', 'alias', 'path', 'active'];

}
