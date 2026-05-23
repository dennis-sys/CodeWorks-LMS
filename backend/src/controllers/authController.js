const supabase = require('../config/supabase');

exports.signUp = async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ success: false, message: 'Email, password, and full name are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  try {
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      if (createError.message?.includes('already been registered') || createError.message?.includes('already registered')) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists. Please sign in.' });
      }
      throw createError;
    }

    const { error: profileError } = await supabase
      .from('users')
      .upsert(
        [{
          auth_id: userData.user.id,
          full_name: fullName.trim(),
          email: email.trim(),
          role: 'student',
        }],
        { onConflict: 'email' }
      );

    if (profileError) throw profileError;

    return res.status(201).json({ success: true, message: 'Account created successfully.' });
  } catch (err) {
    console.error('Sign up error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Sign up failed.' });
  }
};
