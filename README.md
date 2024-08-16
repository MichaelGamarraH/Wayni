# Wayni
El proyecto se divide en back-end y front-end
Para el back-end:
-Si se quiere probar desde su maquina, tendrá que cambiar las credenciales del archivo appsettings.json en "DefaultConnectionString".
-Tendrá que colocar las credenciales de la base de datos sql server.
-Tendrá que abrir la consola de administrador de paquetes NuGets y escribir estos comandos:
  Add-Migration migracion -- Luego de ejecutar eso, ejecutará el comando de abajo
  Update-Database         -- Con esto en su sql server ya estaba la base de datos y la tabla(el nombre de la base de datos lo colocará en el appsettings.json

--Luego de eso ejecute el archivo le da en run y se abrir el swagger

Para el Front-end:
-Le da en abrir terminal y coloca: npm run dev
-Luego ingresar a la dirección que aparecerá y con ello probar las funcionalidades implementadas
  
