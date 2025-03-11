<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        //User::factory()->create([
        //    'name' => 'Test User',
        //    'email' => 'test@example.com',
        //]);

		// Seeding cms_langs
		$lang_default = \App\Models\CmsLang::create(['name' => 'Español', 'iso' => 'es', 'active'=>true]);
		$lang_english = \App\Models\CmsLang::create(['name' => 'English', 'iso' => 'en', 'active'=>true]);

		// Seeding cms_schema_groups
		$schg_default= \App\Models\CmsSchemaGroup::create(['name' => 'Site Principal', 'layout'=>'front', 'default'=>'1', 'active'=>true]);

		// Seeding cms_sites
		$site_root= \App\Models\CmsSite::create(['name' => 'Site Principal', 'site_url'=>'http://localhost/lasbambas-reconocimientos', 'schema_group_id'=>$schg_default->id, 'default'=>'1', 'active'=>true]);

		// Seeding cms_translates_alias

		// Seeding cms_parameters_group
		$pgroup_asunto= \App\Models\CmsParameterGroup::create(['name' => 'Asunto de Contacto', 'alias'=>'asunto', 'active'=>true]);

		// Seeding cms_filetypes
		$ftype_image = \App\Models\CmsFileType::create(['name' => 'Imagen', 'extensions' => 'jpg,jpeg,gif,png', 'active'=>true]);
		$ftype_doc   = \App\Models\CmsFileType::create(['name' => 'Documento', 'extensions' => 'pdf,doc,docx,xls,xlsx,ppt,pptx', 'active'=>true]);
		$ftype_audio = \App\Models\CmsFileType::create(['name' => 'Audio', 'extensions' => 'mp3,aif,wav', 'active'=>true]);
		$ftype_video = \App\Models\CmsFileType::create(['name' => 'Video', 'extensions' => 'mov,avi,mpg,mpeg,mp4,wmv', 'active'=>true]);


		// Seeding cms_directories
		\App\Models\CmsDirectory::create(['type_id' => $ftype_image->id, 'name' => 'Meta-tag: imagen', 'alias' => 'metatag_imagen', 'path' => 'cms/metatag/imagen/', 'active'=>true]);
		\App\Models\CmsDirectory::create(['type_id' => $ftype_image->id, 'name' => 'Página: imagen', 'alias' => 'pagina_imagen', 'path' => 'cms/pagina/imagen/', 'active'=>true]);
		\App\Models\CmsDirectory::create(['type_id' => $ftype_image->id, 'name' => 'Página: icono', 'alias' => 'pagina_icono', 'path' => 'cms/pagina/icono/', 'active'=>true]);
		\App\Models\CmsDirectory::create(['type_id' => $ftype_doc->id, 'name' => 'Página: documento', 'alias' => 'pagina_documento', 'path' => 'cms/pagina/documento/', 'active'=>true]);
		\App\Models\CmsDirectory::create(['type_id' => $ftype_image->id, 'name' => 'Seccion: imagen', 'alias' => 'seccion_imagen', 'path' => 'cms/seccion/imagen/', 'active'=>true]);
		\App\Models\CmsDirectory::create(['type_id' => $ftype_image->id, 'name' => 'Animación: foto', 'alias' => 'animacion_home', 'path' => 'cms/home/foto/', 'active'=>true]);
		\App\Models\CmsDirectory::create(['type_id' => $ftype_image->id, 'name' => 'Término: Imagenes de Texto', 'alias' => 'termino_imagen', 'path' => 'cms/termino/imagen/', 'active'=>true]);
		\App\Models\CmsDirectory::create(['type_id' => $ftype_image->id, 'name' => 'Usuario: foto', 'alias' => 'user_photo', 'path' => 'user/photo/', 'active'=>true]);


		// Seeding cms_forms
		$form_contact = \App\Models\CmsForm::create(['name' => 'Formulario de Contacto', 'alias'=>'contacto', 'active'=>true]);

		// Seeding profiles
		$perfil_sa = \App\Models\Profile::create(['name' => 'Super', 'active'=>true, 'sa'=>'1']);
		$perfil_admin = \App\Models\Profile::create(['name' => 'Admin', 'active'=>true]);
		$perfil_webmaster = \App\Models\Profile::create(['name' => 'Webmaster', 'active'=>true]);


		// Seeding users
		$user_admin = \App\Models\User::create(['username'=>'fischer', 'email' => 'fishdev@gmail.com', 'password' => 'admin$2277', 'name' => 'Administrador', 'profile_id' => $perfil_sa->id, 'active' => '1', 'default' => '1']);


		// Seeding menus
		$menu_home = \App\Models\AdmMenu::create(['name' => 'Inicio', 'position'=>'0', 'active'=>false]);
		$menu_conf = \App\Models\AdmMenu::create(['name' => 'Configuración', 'icon' => 'fa-gear', 'position'=>'1', 'active'=>true]);
		$menu_info = \App\Models\AdmMenu::create(['name' => 'Información general', 'icon' => 'fa-info-circle', 'position'=>'2', 'active'=>true]);
		$menu_webs = \App\Models\AdmMenu::create(['name' => 'Website Principal', 'icon' => 'fa-sitemap', 'position'=>'3', 'active'=>false]);

		$menu_back = \App\Models\AdmMenu::create(['parent_id'=>$menu_conf->id, 'name' => 'Administrador', 'icon' => 'fa-dashboard', 'position'=>'1', 'active'=>true]);
		$menu_web = \App\Models\AdmMenu::create(['parent_id'=>$menu_conf->id, 'name' => 'Website', 'icon' => 'fa-sitemap', 'position'=>'2', 'active'=>false]);
		$menu_cms = \App\Models\AdmMenu::create(['parent_id'=>$menu_conf->id, 'name' => 'CMS', 'icon' => 'fa-edit', 'position'=>'3', 'active'=>false]);
		$menu_forms = \App\Models\AdmMenu::create(['parent_id'=>$menu_info->id, 'name' => 'Formularios', 'icon' => 'fa-list-alt', 'position'=>'2', 'active'=>false]);
		$menu_modules = \App\Models\AdmMenu::create(['parent_id'=>$menu_info->id, 'name' => 'Módulos del Sistema', 'icon' => 'fa-cogs', 'position'=>'1', 'active'=>true]);
		$module_contenido = \App\Models\AdmMenu::create(['parent_id'=>$menu_webs->id, 'name' => 'Contenido Web', 'icon' => 'fa-globe', 'position'=>'1', 'active'=>false]);


		// Seeding adm_modules
		$module_inicio = \App\Models\AdmModule::create(['menu_id' => $menu_home->id, 'name' => 'Dashboard', 'controller' => 'home', 'position'=>'0', 'active'=>true]);
		$module_acceso = \App\Models\AdmModule::create(['menu_id' => $menu_home->id, 'name' => 'Acceso al Sistema', 'controller' => 'login', 'position'=>'0', 'active'=>true]);
		$module_usradm = \App\Models\AdmModule::create(['menu_id' => $menu_back->id, 'name' => 'Usuarios del Sistema', 'title' => 'usuario', 'controller' => 'user', 'icon'=>'fa-user', 'position'=>'1', 'active'=>true]);
		$module_perfil = \App\Models\AdmModule::create(['menu_id' => $menu_back->id, 'name' => 'Perfiles', 'title' => 'perfil', 'controller' => 'profile', 'icon'=>'fa-male', 'position'=>'2', 'active'=>true]);
		$module_reglog = \App\Models\AdmModule::create(['menu_id' => $menu_back->id, 'name' => 'Registro de Logs', 'title' => 'log', 'controller' => 'log', 'icon'=>'fa-book', 'position'=>'3', 'active'=>true]);
		$module_idioma = \App\Models\AdmModule::create(['menu_id' => $menu_web->id, 'name' => 'Idiomas', 'title' => 'idioma', 'controller' => 'lang', 'icon'=>'fa-flag', 'position'=>'2', 'active'=>true]);
		$module_transl= \App\Models\AdmModule::create(['menu_id' => $menu_web->id, 'name' => 'Traducciones', 'title' => 'traducción', 'controller' => 'translate', 'icon'=>'fa-list', 'position'=>'4', 'active'=>true]);
		$module_mensaje= \App\Models\AdmModule::create(['menu_id' => $menu_forms->id, 'name' => 'Mensajes recibidos', 'title' => 'mensaje', 'controller' => 'register', 'icon'=>'fa-inbox', 'position'=>'1', 'active'=>true]);
		$module_cuenta = \App\Models\AdmModule::create(['menu_id' => $menu_forms->id, 'name' => 'Cuentas de correo', 'title' => 'cuenta', 'controller' => 'notify', 'icon'=>'fa-at', 'position'=>'2', 'active'=>true]);

		$module_config = \App\Models\AdmModule::create(['menu_id' => $menu_cms->id, 'name' => 'Configuración', 'title' => 'configuración', 'controller' => 'config', 'icon'=>'fa-cog', 'position'=>'1', 'active'=>true]);
		$module_site = \App\Models\AdmModule::create(['menu_id' => $menu_cms->id, 'name' => 'Sites', 'title' => 'site', 'controller' => 'site', 'icon'=>'fa-globe', 'position'=>'2', 'active'=>true]);
		$module_schema = \App\Models\AdmModule::create(['menu_id' => $menu_cms->id, 'name' => 'Esquemas', 'title' => 'esquema', 'controller' => 'schema', 'icon'=>'fa-random', 'position'=>'3', 'active'=>true]);
		$module_directory = \App\Models\AdmModule::create(['menu_id' => $menu_cms->id, 'name' => 'Directorio de Archivos', 'title' => 'directorio', 'controller' => 'directory', 'icon'=>'fa-folder-open', 'position'=>'4', 'active'=>true]);

		$module_parameter = \App\Models\AdmModule::create(['menu_id' => $menu_modules->id, 'name' => 'Parámetros', 'title' => 'parámetro', 'controller' => 'parameter', 'icon'=>'fa-cog', 'position'=>'1', 'active'=>true]);
		$module_perfilagente = \App\Models\AdmModule::create(['menu_id' => $menu_modules->id, 'name' => 'Perfiles de Agente', 'title' => 'perfil', 'controller' => 'perfilagente', 'icon'=>'fa-male', 'position'=>'1', 'active'=>true]);
		$module_certificacion = \App\Models\AdmModule::create(['menu_id' => $menu_modules->id, 'name' => 'Certificaciones', 'title' => 'certificación', 'controller' => 'certificacion', 'icon'=>'fa-certificate', 'position'=>'1', 'active'=>true]);
		$module_agentes = \App\Models\AdmModule::create(['menu_id' => $menu_modules->id, 'name' => 'Agentes', 'title' => 'agente', 'controller' => 'agente', 'icon'=>'fa-graduation-cap', 'position'=>'1', 'active'=>true]);
		$module_article = \App\Models\AdmModule::create(['menu_id' => $module_contenido->id, 'name' => 'Páginas', 'title' => 'contenido', 'controller' => 'article', 'icon'=>'fa-file', 'position'=>'1', 'active'=>true]);

		// Seeding adm_actions
		$action_lista = \App\Models\AdmAction::create(['name' => 'Listar (solo lectura)', 'alias'=>'listar', 'write_log'=>'0']);
		$action_admin = \App\Models\AdmAction::create(['name' => 'Administrar (agregar/modificar/eliminar)', 'alias'=>'administrar', 'write_log'=>'1']);
		$action_login = \App\Models\AdmAction::create(['name' => 'Login (ingresar al sistema)', 'alias'=>'login', 'write_log'=>'1']);
		$action_logout = \App\Models\AdmAction::create(['name' => 'Logout (salir del sistema)', 'alias'=>'logout', 'write_log'=>'1']);


		// Seeding adm_events
		\App\Models\AdmEvent::create(['module_id' => $module_acceso->id, 'action_id' => $action_login->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_acceso->id, 'action_id' => $action_logout->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_usradm->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_usradm->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_perfil->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_perfil->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_reglog->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_reglog->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_idioma->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_idioma->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_transl->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_transl->id, 'action_id' => $action_admin->id]);

		\App\Models\AdmEvent::create(['module_id' => $module_config->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_config->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_site->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_site->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_schema->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_schema->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_directory->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_directory->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_mensaje->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_mensaje->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_cuenta->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_cuenta->id, 'action_id' => $action_admin->id]);

		\App\Models\AdmEvent::create(['module_id' => $module_parameter->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_parameter->id, 'action_id' => $action_admin->id]);

		\App\Models\AdmEvent::create(['module_id' => $module_perfilagente->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_perfilagente->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_certificacion->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_certificacion->id, 'action_id' => $action_admin->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_agentes->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_agentes->id, 'action_id' => $action_admin->id]);

        \App\Models\AdmEvent::create(['module_id' => $module_article->id, 'action_id' => $action_lista->id]);
		\App\Models\AdmEvent::create(['module_id' => $module_article->id, 'action_id' => $action_admin->id]);

		//Seeding cms_schema
		\App\Models\CmsSchema::create(['group_id' => $schg_default->id, 'name' => 'Home Page', 'admin_view'=>'contenedor', 'front_view'=>'home_page', 'iterations'=>1, 'is_page'=>1, 'active'=>1]);
		\App\Models\CmsSchema::create(['group_id' => $schg_default->id, 'name' => 'Menu Principal', 'admin_view'=>'contenedor', 'front_view'=>'menu_principal', 'iterations'=>1, 'active'=>1]);
		\App\Models\CmsSchema::create(['group_id' => $schg_default->id, 'name' => 'Menu Header', 'admin_view'=>'contenedor', 'front_view'=>'menu_header', 'iterations'=>1, 'active'=>1]);
		\App\Models\CmsSchema::create(['group_id' => $schg_default->id, 'name' => 'Menu Footer', 'admin_view'=>'contenedor', 'front_view'=>'menu_footer', 'iterations'=>1, 'active'=>1]);
		\App\Models\CmsSchema::create(['parent_id'=>1, 'group_id' => $schg_default->id, 'name' => 'Animacion Principal', 'admin_view'=>'contenedor', 'front_view'=>'animacion_home', 'iterations'=>1, 'active'=>1]);

    }
}
