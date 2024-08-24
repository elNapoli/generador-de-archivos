<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>

    <quill-editor
      v-model:content="hola"
      toolbar="full"
      content-type="html"
      theme="snow"
    />
  </basic-container>
</template>

<script setup>
import { ref } from 'vue'

const hola = ref(`<h1>Contrato de Servicios</h1>

<p><strong>Este Contrato de Servicios</strong> (en adelante, el "Contrato") se celebra en esta fecha [Fecha], entre [Nombre del Cliente], con domicilio en [Dirección del Cliente] (en adelante, el "Cliente"), y [Nombre del Proveedor], con domicilio en [Dirección del Proveedor] (en adelante, el "Proveedor").</p>

<h2>1. Descripción de los Servicios</h2>
<p>El Proveedor se compromete a proporcionar los siguientes servicios al Cliente:</p>
<ul>
  <li>Servicio 1: Descripción del Servicio 1.</li>
  <li>Servicio 2: Descripción del Servicio 2.</li>
  <li>Servicio 3: Descripción del Servicio 3.</li>
</ul>

<h2>2. Compensación</h2>
<p>El Cliente pagará al Proveedor la suma de [Monto] por los servicios descritos en la Sección 1. El pago se realizará de la siguiente manera:</p>
<ul>
  <li>Pago inicial de [Monto] al momento de la firma de este Contrato.</li>
  <li>Pago final de [Monto] a la finalización de los servicios.</li>
</ul>

<h2>3. Plazos</h2>
<p>Los servicios serán prestados en el siguiente plazo:</p>
<ul>
  <li>Inicio de los servicios: [Fecha de Inicio]</li>
  <li>Finalización de los servicios: [Fecha de Finalización]</li>
</ul>

<h2>4. Confidencialidad</h2>
<p>El Proveedor se compromete a mantener la confidencialidad de toda la información proporcionada por el Cliente y a no divulgar dicha información a terceros sin el consentimiento previo del Cliente.</p>

<h2>5. Terminación</h2>
<p>Cualquiera de las partes puede terminar este Contrato con un aviso previo de [Número de Días] días. En caso de terminación, el Cliente pagará al Proveedor por todos los servicios prestados hasta la fecha de terminación.</p>

<h2>6. Firmas</h2>
<p>Firmado por:</p>

<p><strong>[Nombre del Cliente]</strong><br/>
Firma: _______________________________<br/>
Fecha: _______________________________</p>

<p><strong>[Nombre del Proveedor]</strong><br/>
Firma: _______________________________<br/>
Fecha: _______________________________</p>`)
</script>

<style lang="">

</style>
