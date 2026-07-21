-- ============================================================
-- Seed Components for ApexUI
-- Run AFTER all migrations have been applied.
-- Make sure at least one user exists in public.users first.
-- ============================================================

-- First, create a seed admin user
-- (Replace with actual UUID from a real auth user if needed)
-- INSERT INTO public.users (id, username, display_name, bio, is_admin)
-- VALUES ('00000000-0000-0000-0000-000000000000', 'apexui', 'ApexUI Team', 'Official ApexUI seed components', TRUE);

-- Sample seed components (use after a real user exists)
-- Update the creator_id with an actual user UUID before running.

DO $$
DECLARE
  v_creator_id UUID;
BEGIN
  -- Get the first admin user
  SELECT id INTO v_creator_id FROM public.users WHERE is_admin = TRUE LIMIT 1;

  IF v_creator_id IS NULL THEN
    RAISE NOTICE 'No admin user found. Skipping seed.';
    RETURN;
  END IF;

  -- Button: Neon Pulse Button
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, description_long, tech, status, preview_html, code_html, code_tailwind)
  VALUES (
    'neon-pulse-button',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'buttons'),
    'Neon Pulse Button',
    'A glowing neon button with a pulsing animation effect, perfect for CTAs on dark backgrounds.',
    'This button uses a combination of box-shadow and CSS animations to create a neon glow effect that pulses gently, drawing attention without being distracting.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:200px;background:#0D0D10;font-family:sans-serif"><style>.neon-btn{padding:16px 40px;border:2px solid #8B5CF6;border-radius:8px;background:transparent;color:#FAFAFA;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease;box-shadow:0 0 15px rgba(139,92,246,.3),inset 0 0 15px rgba(139,92,246,.1)}.neon-btn:hover{box-shadow:0 0 30px rgba(139,92,246,.6),inset 0 0 30px rgba(139,92,246,.2);transform:translateY(-2px)}@keyframes pulse{0%,100%{box-shadow:0 0 15px rgba(139,92,246,.3)}50%{box-shadow:0 0 25px rgba(139,92,246,.5)}}.neon-btn{animation:pulse 2s ease-in-out infinite}</style><button class="neon-btn">Get Started</button></div>',
    '<div class="neon-btn-wrapper"><style>.neon-btn{padding:16px 40px;border:2px solid #8B5CF6;border-radius:8px;background:transparent;color:#FAFAFA;font-size:16px;font-weight:600;cursor:pointer;transition:all .3s ease;box-shadow:0 0 15px rgba(139,92,246,.3),inset 0 0 15px rgba(139,92,246,.1)}.neon-btn:hover{box-shadow:0 0 30px rgba(139,92,246,.6),inset 0 0 30px rgba(139,92,246,.2);transform:translateY(-2px)}@keyframes pulse{0%,100%{box-shadow:0 0 15px rgba(139,92,246,.3)}50%{box-shadow:0 0 25px rgba(139,92,246,.5)}}.neon-btn{animation:pulse 2s ease-in-out infinite}</style><button class="neon-btn">Get Started</button></div>',
    '<button class="px-10 py-4 border-2 border-violet-500 rounded-lg bg-transparent text-zinc-50 text-base font-semibold cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 animate-[pulse_2s_ease-in-out_infinite]">Get Started</button>'
  );

  -- Card: Frosted Glass Info Card
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, description_long, tech, status, preview_html, code_html, code_tailwind)
  VALUES (
    'frosted-glass-card',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'cards'),
    'Frosted Glass Info Card',
    'A premium glassmorphism card with backdrop blur, perfect for dashboards and profile sections.',
    'Features a frosted glass effect with backdrop-filter blur, subtle border, and a gentle hover lift. Ideal for displaying user profiles, statistics, or feature highlights on dark-themed interfaces.',
    'tailwind',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:280px;background:#0D0D10;font-family:sans-serif;padding:20px"><div style="background:rgba(24,24,27,0.75);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(39,39,42,0.8);border-radius:16px;padding:32px;max-width:320px;width:100%;box-shadow:0 25px 50px rgba(0,0,0,0.6)"><div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#8B5CF6,#10B981);margin-bottom:16px"></div><h3 style="color:#FAFAFA;font-size:18px;font-weight:600;margin:0 0 8px">Alex Rivera</h3><p style="color:#A1A1AA;font-size:14px;margin:0 0 16px">Full-stack developer passionate about building beautiful, accessible web experiences.</p><div style="display:flex;gap:12px;color:#71717A;font-size:13px"><span>1.2k followers</span><span>47 projects</span></div></div></div>',
    NULL,
    '<div class="w-full max-w-sm p-8 rounded-[16px] border border-[rgba(39,39,42,0.8)]" style="background:rgba(24,24,27,0.75);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 25px 50px rgba(0,0,0,0.6)"><div class="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-violet-500 to-emerald-500 mb-4"></div><h3 class="text-[#FAFAFA] text-lg font-semibold mb-2">Alex Rivera</h3><p class="text-[#A1A1AA] text-sm mb-4">Full-stack developer passionate about building beautiful, accessible web experiences.</p><div class="flex gap-3 text-[#71717A] text-xs"><span>1.2k followers</span><span>47 projects</span></div></div>'
  );

  -- Loader: Spinning Ring Loader
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'spinning-ring-loader',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'loaders'),
    'Spinning Ring Loader',
    'A smooth rotating ring loader with a gradient border, ideal for async content loading states.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:200px;background:#0D0D10"><style>@keyframes spin{to{transform:rotate(360deg)}}.ring-loader{width:48px;height:48px;border-radius:50%;border:3px solid transparent;border-top-color:#8B5CF6;border-right-color:#10B981;animation:spin .8s linear infinite}</style><div class="ring-loader"></div></div>',
    '<div class="ring-loader-wrapper"><style>@keyframes spin{to{transform:rotate(360deg)}}.ring-loader{width:48px;height:48px;border-radius:50%;border:3px solid transparent;border-top-color:#8B5CF6;border-right-color:#10B981;animation:spin .8s linear infinite}</style><div class="ring-loader"></div></div>'
  );

  -- Form: Minimal Login Form
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'minimal-login-form',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'forms'),
    'Minimal Login Form',
    'A clean, minimal login form with floating labels and a glowing submit button.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:300px;background:#0D0D10;font-family:sans-serif;padding:20px"><form style="width:100%;max-width:340px"><h2 style="color:#FAFAFA;font-size:22px;font-weight:700;margin:0 0 8px">Welcome back</h2><p style="color:#71717A;font-size:14px;margin:0 0 28px">Sign in to your account</p><div style="margin-bottom:16px"><label style="display:block;color:#A1A1AA;font-size:13px;font-weight:500;margin-bottom:6px">Email</label><input type="email" placeholder="you@example.com" style="width:100%;padding:10px 14px;background:#18181B;border:1px solid #27272A;border-radius:8px;color:#FAFAFA;font-size:14px;outline:none;box-sizing:border-box" /></div><div style="margin-bottom:24px"><label style="display:block;color:#A1A1AA;font-size:13px;font-weight:500;margin-bottom:6px">Password</label><input type="password" placeholder="••••••••" style="width:100%;padding:10px 14px;background:#18181B;border:1px solid #27272A;border-radius:8px;color:#FAFAFA;font-size:14px;outline:none;box-sizing:border-box" /></div><button type="submit" style="width:100%;padding:12px;background:#8B5CF6;color:#FAFAFA;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s">Sign In</button></form></div>',
    '<div class="form-container"><style>.form-group{margin-bottom:16px}.form-group label{display:block;color:#A1A1AA;font-size:13px;font-weight:500;margin-bottom:6px}.form-group input{width:100%;padding:10px 14px;background:#18181B;border:1px solid #27272A;border-radius:8px;color:#FAFAFA;font-size:14px;outline:none;box-sizing:border-box;transition:border-color .2s}.form-group input:focus{border-color:#8B5CF6;box-shadow:0 0 0 2px rgba(139,92,246,.2)}.submit-btn{width:100%;padding:12px;background:#8B5CF6;color:#FAFAFA;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s}.submit-btn:hover{background:#7C3AED}</style><form style="width:100%;max-width:340px"><h2 style="color:#FAFAFA;font-size:22px;font-weight:700;margin:0 0 8px">Welcome back</h2><p style="color:#71717A;font-size:14px;margin:0 0 28px">Sign in to your account</p><div class="form-group"><label>Email</label><input type="email" placeholder="you@example.com" /></div><div class="form-group"><label>Password</label><input type="password" placeholder="••••••••" /></div><button type="submit" class="submit-btn">Sign In</button></form></div>'
  );

  -- Input: Glowing Search Input
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'glowing-search-input',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'inputs'),
    'Glowing Search Input',
    'A search input field with a subtle violet glow on focus, featuring an embedded search icon.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:150px;background:#0D0D10;font-family:sans-serif;padding:20px"><div style="position:relative;width:100%;max-width:400px"><span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#71717A;font-size:16px">🔍</span><input type="search" placeholder="Search components..." style="width:100%;padding:12px 14px 12px 42px;background:#18181B;border:1px solid #27272A;border-radius:10px;color:#FAFAFA;font-size:15px;outline:none;box-sizing:border-box;transition:all .3s" /></div></div>',
    '<div class="search-wrapper" style="position:relative;width:100%;max-width:400px"><style>.search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#71717A;font-size:16px;pointer-events:none}.search-input{width:100%;padding:12px 14px 12px 42px;background:#18181B;border:1px solid #27272A;border-radius:10px;color:#FAFAFA;font-size:15px;outline:none;box-sizing:border-box;transition:all .3s}.search-input:focus{border-color:#8B5CF6;box-shadow:0 0 0 3px rgba(139,92,246,.15),0 0 20px rgba(139,92,246,.1)}</style><span class="search-icon">🔍</span><input type="search" placeholder="Search components..." class="search-input" /></div>'
  );

  -- Badge: Status Badge Set
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'status-badge-set',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'badges'),
    'Status Badge Set',
    'A collection of color-coded status badges for indicating component or system state.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;min-height:150px;background:#0D0D10;font-family:sans-serif;padding:20px"><style>.badge{padding:4px 12px;border-radius:9999px;font-size:12px;font-weight:600;letter-spacing:.02em}</style><span class="badge" style="background:rgba(16,185,129,.15);color:#10B981;border:1px solid rgba(16,185,129,.3)">Active</span><span class="badge" style="background:rgba(245,158,11,.15);color:#F59E0B;border:1px solid rgba(245,158,11,.3)">Pending</span><span class="badge" style="background:rgba(239,68,68,.15);color:#EF4444;border:1px solid rgba(239,68,68,.3)">Error</span><span class="badge" style="background:rgba(99,102,241,.15);color:#818CF8;border:1px solid rgba(99,102,241,.3)">Beta</span></div>',
    '<div class="badge-set" style="display:flex;gap:12px;flex-wrap:wrap"><style>.badge{padding:4px 12px;border-radius:9999px;font-size:12px;font-weight:600;letter-spacing:.02em}.badge-success{background:rgba(16,185,129,.15);color:#10B981;border:1px solid rgba(16,185,129,.3)}.badge-warning{background:rgba(245,158,11,.15);color:#F59E0B;border:1px solid rgba(245,158,11,.3)}.badge-error{background:rgba(239,68,68,.15);color:#EF4444;border:1px solid rgba(239,68,68,.3)}.badge-info{background:rgba(99,102,241,.15);color:#818CF8;border:1px solid rgba(99,102,241,.3)}</style><span class="badge badge-success">Active</span><span class="badge badge-warning">Pending</span><span class="badge badge-error">Error</span><span class="badge badge-info">Beta</span></div>'
  );

  -- Navbar: Minimal Top Navigation
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'minimal-top-nav',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'navbars'),
    'Minimal Top Navigation',
    'A sleek, minimal top navigation bar with logo, nav links, and a CTA button.',
    'tailwind',
    'published',
    '<div style="background:#09090B;padding:0;font-family:sans-serif"><nav style="display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;padding:14px 24px"><div style="color:#FAFAFA;font-size:20px;font-weight:800">Logo</div><div style="display:flex;gap:24px;align-items:center"><a href="#" style="color:#A1A1AA;text-decoration:none;font-size:14px;transition:color .2s">Components</a><a href="#" style="color:#A1A1AA;text-decoration:none;font-size:14px;transition:color .2s">Docs</a><a href="#" style="color:#A1A1AA;text-decoration:none;font-size:14px;transition:color .2s">Community</a><button style="padding:8px 20px;background:#8B5CF6;color:#FAFAFA;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer">Get Started</button></div></nav></div>',
    NULL
  );

  -- Tooltip: Animated Tooltip
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'animated-tooltip',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'tooltips'),
    'Animated Tooltip',
    'A lightweight CSS-only tooltip that fades in and scales on hover, with a custom arrow pointer.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:200px;background:#0D0D10;font-family:sans-serif"><style>.tooltip-trigger{position:relative;display:inline-block;padding:10px 24px;background:#18181B;color:#FAFAFA;border:1px solid #27272A;border-radius:8px;font-size:14px;cursor:pointer}.tooltip-trigger .tooltip-text{visibility:hidden;opacity:0;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) scale(.95);background:#1C1C1F;color:#FAFAFA;padding:6px 12px;border-radius:6px;font-size:12px;white-space:nowrap;border:1px solid #27272A;transition:all .15s ease}.tooltip-trigger .tooltip-text::after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#27272A}.tooltip-trigger:hover .tooltip-text{visibility:visible;opacity:1;transform:translateX(-50%) scale(1)}</style><div class="tooltip-trigger">Hover me<span class="tooltip-text">I''m a tooltip!</span></div></div>',
    '<div class="tooltip-wrapper"><style>.tooltip-trigger{position:relative;display:inline-block;padding:10px 24px;background:#18181B;color:#FAFAFA;border:1px solid #27272A;border-radius:8px;font-size:14px;cursor:pointer}.tooltip-trigger .tooltip-text{visibility:hidden;opacity:0;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) scale(.95);background:#1C1C1F;color:#FAFAFA;padding:6px 12px;border-radius:6px;font-size:12px;white-space:nowrap;border:1px solid #27272A;transition:all .15s ease;pointer-events:none}.tooltip-trigger .tooltip-text::after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#27272A}.tooltip-trigger:hover .tooltip-text{visibility:visible;opacity:1;transform:translateX(-50%) scale(1)}</style><div class="tooltip-trigger">Hover me<span class="tooltip-text">I''m a tooltip!</span></div></div>'
  );

  -- Animation: Shimmer Loading
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'shimmer-loading-skeleton',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'animations'),
    'Shimmer Loading Skeleton',
    'A shimmer animation effect for loading skeleton placeholders, commonly used in card layouts.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:200px;background:#0D0D10;font-family:sans-serif;padding:20px"><style>@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}.skeleton{background:linear-gradient(90deg,#18181B 25%,#27272A 50%,#18181B 75%);background-size:200% 100%;animation:shimmer 1.5s ease-in-out infinite;border-radius:8px}</style><div style="width:280px"><div class="skeleton" style="height:160px;margin-bottom:12px"></div><div class="skeleton" style="height:16px;width:70%;margin-bottom:8px"></div><div class="skeleton" style="height:14px;width:45%"></div></div></div>',
    '<div class="skeleton-wrapper" style="width:280px"><style>@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}.skeleton{background:linear-gradient(90deg,#18181B 25%,#27272A 50%,#18181B 75%);background-size:200% 100%;animation:shimmer 1.5s ease-in-out infinite;border-radius:8px}</style><div class="skeleton" style="height:160px;margin-bottom:12px"></div><div class="skeleton" style="height:16px;width:70%;margin-bottom:8px"></div><div class="skeleton" style="height:14px;width:45%"></div></div>'
  );

  -- Background: Animated Gradient Mesh
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'animated-gradient-mesh',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'backgrounds'),
    'Animated Gradient Mesh',
    'A smooth animated mesh gradient background using multiple radial gradients that slowly shift colors.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:250px;background:#0D0D10;font-family:sans-serif;position:relative;overflow:hidden"><style>@keyframes gradientShift{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(30px,-30px) scale(1.05)}50%{transform:translate(-20px,20px) scale(.95)}75%{transform:translate(10px,30px) scale(1.02)}}.mesh-bg{position:absolute;inset:0}.mesh-bg .orb{position:absolute;width:300px;height:300px;border-radius:50%;filter:blur(80px);animation:gradientShift 8s ease-in-out infinite}.mesh-bg .orb:nth-child(1){background:rgba(139,92,246,.25);top:-50px;left:-50px;animation-delay:0s}.mesh-bg .orb:nth-child(2){background:rgba(16,185,129,.2);bottom:-50px;right:-50px;animation-delay:4s}.mesh-bg .orb:nth-child(3){background:rgba(245,158,11,.15);top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:2s}</style><div class="mesh-bg"><div class="orb"></div><div class="orb"></div><div class="orb"></div></div><span style="position:relative;z-index:1;color:#FAFAFA;font-size:18px;font-weight:600">Animated Mesh Background</span></div>',
    '<div class="mesh-container" style="position:relative;min-height:250px;overflow:hidden;background:#0D0D10;display:flex;align-items:center;justify-content:center"><style>@keyframes gradientShift{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(30px,-30px) scale(1.05)}50%{transform:translate(-20px,20px) scale(.95)}75%{transform:translate(10px,30px) scale(1.02)}}.mesh-bg{position:absolute;inset:0}.mesh-bg .orb{position:absolute;width:300px;height:300px;border-radius:50%;filter:blur(80px);animation:gradientShift 8s ease-in-out infinite}.mesh-bg .orb:nth-child(1){background:rgba(139,92,246,.25);top:-50px;left:-50px;animation-delay:0s}.mesh-bg .orb:nth-child(2){background:rgba(16,185,129,.2);bottom:-50px;right:-50px;animation-delay:4s}.mesh-bg .orb:nth-child(3){background:rgba(245,158,11,.15);top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:2s}</style><div class="mesh-bg"><div class="orb"></div><div class="orb"></div><div class="orb"></div></div><span style="position:relative;z-index:1;color:#FAFAFA;font-size:18px;font-weight:600">Animated Mesh Background</span></div>'
  );

  -- Pattern: Dot Grid Pattern
  INSERT INTO public.components (slug, creator_id, category_id, name, description_short, tech, status, preview_html, code_html)
  VALUES (
    'dot-grid-pattern',
    v_creator_id,
    (SELECT id FROM categories WHERE slug = 'patterns'),
    'Dot Grid Pattern',
    'A subtle dot grid background pattern using CSS radial-gradient, adding texture to dark surfaces.',
    'html_css',
    'published',
    '<div style="display:flex;align-items:center;justify-content:center;min-height:200px;background:#09090B;font-family:sans-serif;position:relative"><div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:24px 24px"></div><span style="position:relative;z-index:1;color:#A1A1AA;font-size:14px">Dot Grid Pattern Overlay</span></div>',
    '<div class="pattern-container" style="position:relative;min-height:200px;background:#09090B;display:flex;align-items:center;justify-content:center"><div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:24px 24px"></div><span style="position:relative;z-index:1;color:#A1A1AA;font-size:14px">Dot Grid Pattern Overlay</span></div>'
  );

  RAISE NOTICE 'Seed data inserted successfully!';
END $$;
