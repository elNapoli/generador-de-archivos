alter table "public"."document_templates" alter column "content" set data type text using "content"::text;

alter table "public"."user_documents" alter column "attributes" set data type jsonb using "attributes"::jsonb;



