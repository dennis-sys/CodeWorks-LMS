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
    // Use the regular signup flow so Supabase sends its confirmation email
    // through the SMTP provider configured in the project settings.
    const { data: userData, error: createError } = await supabase.publicAuth.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
      },
    });

    if (createError) {
      if (/confirmation email/i.test(createError.message || '')) {
        if (userData?.user?.id) {
          await supabase.auth.admin.deleteUser(userData.user.id);
        }
        return res.status(502).json({
          success: false,
          message: 'We could not send the confirmation email. Please verify the Supabase custom SMTP settings and try again.',
        });
      }
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

    if (profileError) {
      // Do not leave an auth account behind when the profile cannot be saved.
      await supabase.auth.admin.deleteUser(userData.user.id);
      throw profileError;
    }

    return res.status(201).json({
      success: true,
      message: 'Account created. Check your email for the confirmation link.',
    });
  } catch (err) {
    console.error('Sign up error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Sign up failed.' });
  }
};
