alter table "public"."subscription_plans" alter column "description" set data type jsonb using "description"::jsonb;

create policy "Enable read access for all users"
on "public"."subscription_plans"
as permissive
for select
to public
using (true);




