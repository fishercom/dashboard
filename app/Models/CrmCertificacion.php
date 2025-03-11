<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmCertificacion extends Model
{
    use HasFactory;
	protected $table = 'crm_certificaciones';
	protected $fillable = ['perfil_id', 'organizacion_id', 'name', 'metadata', 'active'];
    protected $casts = [
        'metadata' => 'array',
    ];

    public function organizacion()
    {
        return $this->hasOne('App\Models\CmsParameter', 'id', 'organizacion_id');
    }
}
