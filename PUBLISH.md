# 📦 Guía para Publicar el Paquete en npm

## 📋 Pasos para Publicar

### **1. Verificar que todo esté listo**

```bash
# Asegúrate de estar en la raíz del proyecto
cd ResponsiveSystem

# Instalar dependencias de desarrollo
npm install
```

### **2. Probar el build**

```bash
# Ejecutar el build
npm run build
```

Esto debería generar:
- `dist/responsive-system.mjs` (ESM)
- `dist/responsive-system.cjs` (CommonJS)
- `dist/index.d.ts` (y otros archivos .d.ts)

### **3. Verificar el contenido del paquete**

```bash
# Ver qué archivos se incluirán en el paquete
npm pack --dry-run
```

Esto muestra qué archivos se empaquetarán sin crear el archivo `.tgz`.

### **4. Crear cuenta en npm (si no tienes una)**

```bash
# Crear cuenta en https://www.npmjs.com/signup
# O usar el comando:
npm adduser
```

### **5. Iniciar sesión en npm**

```bash
npm login
```

Ingresa tu:
- Username
- Password
- Email
- OTP (si tienes 2FA habilitado)

### **6. Verificar que estás logueado**

```bash
npm whoami
```

Debería mostrar tu username de npm.

### **7. Verificar el nombre del paquete**

**IMPORTANTE:** Verifica que el nombre `responsive-system` esté disponible:

```bash
# Verificar si el nombre está disponible
npm view responsive-system
```

Si el nombre ya existe, tendrás que:
- Cambiar el nombre en `package.json` a algo único (ej: `@tu-usuario/responsive-system`)
- O usar un scope: `@felipecaroca/responsive-system`

### **8. Publicar el paquete**

```bash
# Publicar (el script prepublishOnly ejecutará el build automáticamente)
npm publish
```

Si usas un scope (ej: `@felipecaroca/responsive-system`), necesitas publicar como público:

```bash
npm publish --access public
```

### **9. Verificar la publicación**

```bash
# Ver tu paquete publicado
npm view responsive-system

# O visitar en el navegador
# https://www.npmjs.com/package/responsive-system
```

---

## 🔄 Actualizar el Paquete (Nuevas Versiones)

### **1. Actualizar la versión**

```bash
# Versión patch (1.0.0 -> 1.0.1)
npm version patch

# Versión minor (1.0.0 -> 1.1.0)
npm version minor

# Versión major (1.0.0 -> 2.0.0)
npm version major
```

O edita manualmente `package.json` y luego:

```bash
npm version patch --no-git-tag-version
```

### **2. Publicar la nueva versión**

```bash
npm publish
```

---

## 🛠️ Troubleshooting

### **Error: "You must verify your email"**
- Ve a https://www.npmjs.com/
- Verifica tu email en tu perfil

### **Error: "Package name already exists"**
- Cambia el nombre en `package.json` a algo único
- O usa un scope: `@tu-usuario/responsive-system`

### **Error: "You do not have permission"**
- Verifica que estés logueado: `npm whoami`
- Si usas scope, asegúrate de publicar con `--access public`

### **Error: "Invalid package name"**
- El nombre debe ser en minúsculas
- No puede tener espacios
- Puede tener guiones y guiones bajos

---

## 📝 Checklist Antes de Publicar

- [ ] ✅ Build funciona correctamente (`npm run build`)
- [ ] ✅ No hay errores de TypeScript
- [ ] ✅ `package.json` tiene todos los campos necesarios
- [ ] ✅ README.md está actualizado
- [ ] ✅ El nombre del paquete está disponible
- [ ] ✅ Estás logueado en npm (`npm whoami`)
- [ ] ✅ Versión es correcta (empezar con 1.0.0)

---

## 🎯 Comandos Rápidos

```bash
# Build + Verificar + Publicar (todo en uno)
npm run build && npm pack --dry-run && npm publish
```

---

## 📚 Recursos

- [Documentación oficial de npm](https://docs.npmjs.com/)
- [Guía de publicación de paquetes](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

