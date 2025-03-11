<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsFormField extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_form_fields';
	protected $fillable = ['form_id', 'name', 'alias', 'type', 'options', 'active'];

}
