-- Insert fake data for testing
-- First, let's insert some fake profiles
INSERT INTO profiles (id, email, full_name, phone, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111', 'ahmed.k@example.com', 'أحمد كريم', '0661234567', NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'fatima.m@example.com', 'فاطمة محمد', '0662345678', NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'omar.b@example.com', 'عمر بن علي', '0663456789', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'sara.h@example.com', 'سارة حسن', '0664567890', NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'youssef.t@example.com', 'يوسف طاهر', '0665678901', NOW(), NOW());

-- Now insert fake reports
INSERT INTO reports (
  id,
  user_id,
  full_name,
  email,
  phone,
  instagram_handle,
  accused_name,
  course_name,
  description,
  rating,
  price,
  category,
  status,
  created_at,
  updated_at
) VALUES
(
  '11111111-aaaa-aaaa-aaaa-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'أحمد كريم',
  'ahmed.k@example.com',
  '0661234567',
  '@fake_marketing_guru',
  'محمد ديجيتال',
  'دورة التسويق الرقمي المتقدم',
  'وعد باستراتيجيات تسويق متقدمة مع نتائج مضمونة. دفعت 3000 درهم مقابل دروس يوتيوب أساسية والوصول إلى مجموعة واتساب. لا يوجد دعم بعد الدفع. المحتوى قديم ولا يحتوي على أي استراتيجيات حديثة.',
  1,
  3000,
  'التسويق الرقمي',
  'approved',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),
(
  '22222222-bbbb-bbbb-bbbb-222222222222',
  '22222222-2222-2222-2222-222222222222',
  'فاطمة محمد',
  'fatima.m@example.com',
  '0662345678',
  '@crypto_master_ma',
  'يوسف كريبتو',
  'مخطط مليونير العملات المشفرة',
  'مدرب على إنستغرام وعد بعوائد مضمونة 500% في 30 يومًا. جمع 5000 درهم ثم اختفى تمامًا. كل الشهادات والصور مزيفة. تم حذف الحساب بعد جمع الأموال.',
  1,
  5000,
  'العملات المشفرة',
  'approved',
  NOW() - INTERVAL '1 week',
  NOW() - INTERVAL '1 week'
),
(
  '33333333-cccc-cccc-cccc-333333333333',
  '33333333-3333-3333-3333-333333333333',
  'عمر بن علي',
  'omar.b@example.com',
  '0663456789',
  '@business_coach_morocco',
  'ليلى بيزنس',
  'برنامج نجاح التجارة الإلكترونية',
  'إرشادات رائعة وخبرة حقيقية. ساعدني في إطلاق متجري عبر الإنترنت باستراتيجيات مفصلة ودعم مستمر. يستحق كل درهم! المدربة محترفة وتقدم قيمة حقيقية.',
  5,
  4000,
  'تدريب الأعمال',
  'approved',
  NOW() - INTERVAL '2 weeks',
  NOW() - INTERVAL '2 weeks'
),
(
  '44444444-dddd-dddd-dddd-444444444444',
  '44444444-4444-4444-4444-444444444444',
  'سارة حسن',
  'sara.h@example.com',
  '0664567890',
  '@dropship_expert',
  'حسن دروبشيب',
  'إمبراطورية الدروبشيبينغ',
  'محتوى الدورة كان قديمًا والعديد من الاستراتيجيات لم تعد تعمل. بعض الأساسيات المفيدة ولكن لا تستحق سعر 2500 درهم. المدرب لا يرد على الأسئلة بسرعة.',
  2,
  2500,
  'التجارة الإلكترونية',
  'approved',
  NOW() - INTERVAL '3 weeks',
  NOW() - INTERVAL '3 weeks'
),
(
  '55555555-eeee-eeee-eeee-555555555555',
  '55555555-5555-5555-5555-555555555555',
  'يوسف طاهر',
  'youssef.t@example.com',
  '0665678901',
  '@forex_king_ma',
  'رشيد فوركس',
  'أساسيات تداول الفوركس',
  'نصب واحتيال كامل. وعد بأرباح خيالية في الفوركس مقابل 4500 درهم. كل ما حصلت عليه هو فيديوهات من اليوتيوب ومجموعة تيليجرام مليئة بالإعلانات. خسرت أموالي واختفى المدرب.',
  1,
  4500,
  'التداول والاستثمار',
  'approved',
  NOW() - INTERVAL '1 month',
  NOW() - INTERVAL '1 month'
),
(
  '66666666-ffff-ffff-ffff-666666666666',
  '11111111-1111-1111-1111-111111111111',
  'أحمد كريم',
  'ahmed.k@example.com',
  '0661234567',
  '@social_media_expert',
  'نادية سوشيال',
  'احترف وسائل التواصل الاجتماعي',
  'دورة ممتازة ومفيدة جداً. تعلمت استراتيجيات حقيقية لنمو الحسابات على وسائل التواصل الاجتماعي. المدربة خبيرة ومتجاوبة مع الطلاب. أنصح بها بشدة.',
  5,
  2800,
  'وسائل التواصل الاجتماعي',
  'approved',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
);

-- Insert some proof files (optional)
INSERT INTO proof_files (
  id,
  report_id,
  file_url,
  file_name,
  file_type,
  file_size,
  created_at
) VALUES
(
  'file-1111-1111-1111-111111111111',
  '11111111-aaaa-aaaa-aaaa-111111111111',
  'https://example.com/proof1.jpg',
  'screenshot_conversation.jpg',
  'image/jpeg',
  245632,
  NOW()
),
(
  'file-2222-2222-2222-222222222222',
  '22222222-bbbb-bbbb-bbbb-222222222222',
  'https://example.com/proof2.pdf',
  'payment_receipt.pdf',
  'application/pdf',
  156784,
  NOW()
);