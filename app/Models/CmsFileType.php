<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsFileType extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_filetypes';
	protected $fillable = ['name', 'extensions', 'active'];

}
