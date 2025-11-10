import { createClient } from '@supabase/supabase-js';

console.log('\n🔍 SUPABASE CONNECTION VERIFICATION SCRIPT\n');
console.log('=' .repeat(60));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('\n1. Checking Environment Variables:');
console.log('   SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('   SUPABASE_SERVICE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('\n❌ ERROR: Missing required environment variables');
  console.log('\nTo fix this:');
  console.log('1. Go to supabase.com and login');
  console.log('2. Open your project');
  console.log('3. Go to Settings > API');
  console.log('4. Copy the Project URL → Set as SUPABASE_URL');
  console.log('5. Copy the service_role key (click eye icon) → Set as SUPABASE_SERVICE_KEY');
  process.exit(1);
}

console.log('\n2. Testing Connection:');
console.log('   URL format:', supabaseUrl.includes('supabase.co') ? '✅ Valid' : '❌ Invalid format');

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testConnection() {
  try {
    console.log('\n3. Testing Database Connection:');
    
    const { data: tables, error } = await supabase
      .from('accommodations')
      .select('id')
      .limit(1);

    if (error) {
      console.log('   ❌ Connection FAILED');
      console.log('\n   Error:', error.message);
      console.log('   Code:', error.code);
      console.log('   Details:', error.details);
      
      if (error.message.includes('Invalid API key')) {
        console.log('\n🔑 INVALID API KEY DETECTED!');
        console.log('\nYour SUPABASE_SERVICE_KEY is wrong. Here\'s how to fix it:');
        console.log('\n📋 Step-by-Step Fix:');
        console.log('1. Go to https://supabase.com/dashboard/project/_/settings/api');
        console.log('2. Look for "Project API keys" section');
        console.log('3. Find "service_role" key (NOT the "anon" key!)');
        console.log('4. Click the eye icon to reveal the full key');
        console.log('5. Copy the ENTIRE key (starts with "eyJ...")');
        console.log('6. Update your Replit Secret: SUPABASE_SERVICE_KEY');
        console.log('7. Update your Render env var: SUPABASE_SERVICE_KEY');
        console.log('\n⚠️  Common Mistakes:');
        console.log('   - Using "anon" key instead of "service_role" key');
        console.log('   - Not copying the full key');
        console.log('   - Using key from a different Supabase project');
      }
      
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('\n📋 TABLE MISSING!');
        console.log('\nYour tables don\'t exist yet. Run this SQL in Supabase:');
        console.log('\n1. Go to https://supabase.com/dashboard/project/_/sql/new');
        console.log('2. Copy the contents of SUPABASE_MIGRATION.sql');
        console.log('3. Paste and run it');
        console.log('4. Then run SUPABASE_SEED.sql to add initial data');
      }
      
      process.exit(1);
    }

    console.log('   ✅ Connection SUCCESSFUL!');
    console.log('\n4. Checking Tables:');
    
    const tablesToCheck = [
      'accommodations',
      'destinations', 
      'itineraries',
      'blogs',
      'volunteer_programs'
    ];
    
    for (const table of tablesToCheck) {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      if (error) {
        console.log(`   ❌ ${table}: Missing or inaccessible`);
      } else {
        console.log(`   ✅ ${table}: OK (${data?.length || 0} records found)`);
      }
    }
    
    console.log('\n✅ ALL TESTS PASSED!');
    console.log('\nYour Supabase connection is working correctly.');
    console.log('If you still can\'t save data, check your RLS policies.');
    
  } catch (err: any) {
    console.log('   ❌ Unexpected error:', err.message);
    process.exit(1);
  }
}

testConnection();
