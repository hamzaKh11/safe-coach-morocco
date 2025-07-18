-- Solution 1: Temporarily disable the foreign key constraint to insert test data
-- Run this first to disable the constraint
ALTER TABLE profiles DROP CONSTRAINT profiles_id_fkey;

-- Insert fake profiles with test UUIDs
INSERT INTO profiles (id, full_name, phone, role, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111', 'أحمد كريم', '0661234567', 'user', NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'فاطمة محمد', '0662345678', 'user', NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'عمر بن علي', '0663456789', 'user', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'سارة حسن', '0664567890', 'user', NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'يوسف طاهر', '0665678901', 'user', NOW(), NOW()),
('66666666-6666-6666-6666-666666666666', 'نادية الصديقي', '0666789012', 'admin', NOW(), NOW());

-- Re-enable the foreign key constraint (optional - you can leave it disabled for testing)
-- ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);

-- Insert fake reports
INSERT INTO reports (
  id,
  user_id,
  accused_name,
  instagram_handle,
  course_name,
  description,
  rating,
  status,
  is_anonymous,
  views,
  created_at,
  updated_at
) VALUES
(
  '11111111-aaaa-aaaa-aaaa-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'محمد ديجيتال',
  '@fake_marketing_guru',
  'دورة التسويق الرقمي المتقدم',
  'وعد باستراتيجيات تسويق متقدمة مع نتائج مضمونة. دفعت 3000 درهم مقابل دروس يوتيوب أساسية والوصول إلى مجموعة واتساب. لا يوجد دعم بعد الدفع. المحتوى قديم ولا يحتوي على أي استراتيجيات حديثة.',
  1,
  'approved',
  false,
  234,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),
(
  '22222222-bbbb-bbbb-bbbb-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'يوسف كريبتو',
  '@crypto_master_ma',
  'مخطط مليونير العملات المشفرة',
  'مدرب على إنستغرام وعد بعوائد مضمونة 500% في 30 يومًا. جمع 5000 درهم ثم اختفى تمامًا. كل الشهادات والصور مزيفة. تم حذف الحساب بعد جمع الأموال.',
  1,
  'approved',
  false,
  456,
  NOW() - INTERVAL '1 week',
  NOW() - INTERVAL '1 week'
),
(
  '33333333-cccc-cccc-cccc-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'ليلى بيزنس',
  '@business_coach_morocco',
  'برنامج نجاح التجارة الإلكترونية',
  'إرشادات رائعة وخبرة حقيقية. ساعدني في إطلاق متجري عبر الإنترنت باستراتيجيات مفصلة ودعم مستمر. يستحق كل درهم! المدربة محترفة وتقدم قيمة حقيقية.',
  5,
  'approved',
  false,
  189,
  NOW() - INTERVAL '2 weeks',
  NOW() - INTERVAL '2 weeks'
),
(
  '44444444-dddd-dddd-dddd-444444444444',
  '44444444-4444-4444-4444-444444444444',
  'حسن دروبشيب',
  '@dropship_expert',
  'إمبراطورية الدروبشيبينغ',
  'محتوى الدورة كان قديمًا والعديد من الاستراتيجيات لم تعد تعمل. بعض الأساسيات المفيدة ولكن لا تستحق سعر 2500 درهم. المدرب لا يرد على الأسئلة بسرعة.',
  2,
  'approved',
  false,
  112,
  NOW() - INTERVAL '3 weeks',
  NOW() - INTERVAL '3 weeks'
),
(
  '55555555-eeee-eeee-eeee-555555555555',
  '55555555-5555-5555-5555-555555555555',
  'رشيد فوركس',
  '@forex_king_ma',
  'أساسيات تداول الفوركس',
  'نصب واحتيال كامل. وعد بأرباح خيالية في الفوركس مقابل 4500 درهم. كل ما حصلت عليه هو فيديوهات من اليوتيوب ومجموعة تيليجرام مليئة بالإعلانات. خسرت أموالي واختفى المدرب.',
  1,
  'approved',
  true,
  287,
  NOW() - INTERVAL '1 month',
  NOW() - INTERVAL '1 month'
),
(
  '66666666-ffff-ffff-ffff-666666666666',
  '11111111-1111-1111-1111-111111111111',
  'نادية سوشيال',
  '@social_media_expert',
  'احترف وسائل التواصل الاجتماعي',
  'دورة ممتازة ومفيدة جداً. تعلمت استراتيجيات حقيقية لنمو الحسابات على وسائل التواصل الاجتماعي. المدربة خبيرة ومتجاوبة مع الطلاب. أنصح بها بشدة.',
  5,
  'approved',
  false,
  156,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
),
(
  '77777777-gggg-gggg-gggg-777777777777',
  '22222222-2222-2222-2222-222222222222',
  'عبد الرحمن كوتش',
  '@life_coach_ma',
  'تطوير الذات والثقة بالنفس',
  'تدريب ممتاز ومفيد. ساعدني في تطوير مهاراتي الشخصية وزيادة ثقتي بنفسي. المدرب صبور ويعطي أمثلة عملية مفيدة. المحتوى منظم بشكل جيد والتمارين فعالة.',
  4,
  'approved',
  false,
  98,
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '10 days'
),
(
  '88888888-hhhh-hhhh-hhhh-888888888888',
  '33333333-3333-3333-3333-333333333333',
  'كريم فيك',
  '@fake_guru_morocco',
  'أسرار الثراء السريع',
  'دورة مليئة بالوعود الفارغة والمعلومات العامة التي يمكن إيجادها مجاناً على الإنترنت. يركز على البيع أكثر من التعليم. لا أنصح بها على الإطلاق.',
  1,
  'approved',
  true,
  67,
  NOW() - INTERVAL '6 days',
  NOW() - INTERVAL '6 days'
);

-- Insert some proof files (optional)
INSERT INTO proof_files (
  id,
  report_id,
  file_name,
  file_path,
  file_size,
  mime_type,
  created_at
) VALUES
(
  'file-1111-1111-1111-111111111111',
  '11111111-aaaa-aaaa-aaaa-111111111111',
  'screenshot_conversation.jpg',
  'reports/proof/screenshot_conversation.jpg',
  245632,
  'image/jpeg',
  NOW()
),
(
  'file-2222-2222-2222-222222222222',
  '22222222-bbbb-bbbb-bbbb-222222222222',
  'payment_receipt.pdf',
  'reports/proof/payment_receipt.pdf',
  156784,
  'application/pdf',
  NOW()
),
(
  'file-3333-3333-3333-333333333333',
  '55555555-eeee-eeee-eeee-555555555555',
  'telegram_screenshots.png',
  'reports/proof/telegram_screenshots.png',
  387265,
  'image/png',
  NOW()
);

-- Insert some admin notes (optional)
INSERT INTO admin_notes (
  id,
  report_id,
  admin_id,
  note,
  created_at
) VALUES
(
  'note-1111-1111-1111-111111111111',
  '11111111-aaaa-aaaa-aaaa-111111111111',
  '66666666-6666-6666-6666-666666666666',
  'تم التحقق من التقرير. الأدلة المقدمة كافية لتأكيد صحة الشكوى.',
  NOW()
),
(
  'note-2222-2222-2222-222222222222',
  '22222222-bbbb-bbbb-bbbb-222222222222',
  '66666666-6666-6666-6666-666666666666',
  'حالة احتيال واضحة. تم حذف الحساب المشكو منه من إنستغرام.',
  NOW()
);