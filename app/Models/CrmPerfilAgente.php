<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrmPerfilAgente extends Model
{
    use HasFactory;
	protected $table = 'crm_perfilagentes';
	protected $fillable = ['tipoagente_id', 'name', 'metadata', 'active'];
    protected $casts = [
        'metadata' => 'array',
    ];
}
