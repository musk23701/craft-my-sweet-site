-- Drop existing SELECT policy on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create a more restrictive SELECT policy that explicitly requires authentication
CREATE POLICY "Authenticated users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role))
);

-- Also update the UPDATE policy to be consistent
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Authenticated users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL 
  AND (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role))
);