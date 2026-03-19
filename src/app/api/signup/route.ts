import { NextRequest, NextResponse } from 'next/server'

// TODO: Replace with Supabase client
// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // TODO: Store in Supabase
    // const { data, error } = await supabase
    //   .from('waitlist')
    //   .insert({ email, signed_up_at: new Date().toISOString() })
    //   .select()
    
    // For now, just log it
    console.log(`[WAITLIST] New signup: ${email}`)

    return NextResponse.json({ 
      success: true, 
      message: 'Added to waitlist!' 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
