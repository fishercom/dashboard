<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsTranslate extends Model {

	protected $table = 'cms_translates';
	protected $fillable = ['alias', 'input_type', 'metadata'];
    protected $casts = [
        'metadata' => 'array',
    ];

}
