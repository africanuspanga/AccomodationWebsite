-- =============================================
-- SUPABASE SEED DATA SCRIPT
-- Accommodation Collection Website
-- =============================================
-- Run this script AFTER running SUPABASE_MIGRATION.sql
-- This populates the database with initial content
-- =============================================

-- =============================================
-- SEED: Accommodations (10 records)
-- =============================================

INSERT INTO accommodations (id, name, continental, country, destination, category, description, price, rating, features, image_url) VALUES
('1', 'Four Seasons Safari Lodge Serengeti', 'africa', 'tanzania', 'serengeti', 'ultra-luxury', 'Luxury safari lodge with infinity pool, world-class spa, and private balconies overlooking a watering hole where wildlife congregates daily. Elevated platforms provide spectacular game viewing opportunities.', 2500, 5, ARRAY['Infinity Pool', 'Spa Services', 'Wildlife Viewing', 'Hot Air Balloon Safari'], '/attached_assets/four-seasons-serengeti-night_1757883337619.jpg'),

('2', 'Singita Sasakwa Lodge', 'africa', 'tanzania', 'serengeti', 'ultra-luxury', 'Award-winning Edwardian manor-style lodge with Persian carpets, vintage collectibles, and unparalleled old-world luxury charm in the Grumeti Game Reserve.', 2200, 5, ARRAY['Edwardian Style', 'Grumeti Access', 'Conservation Focus', 'Gourmet Dining'], '/attached_assets/singit sasakwa lodge_1757883337620.jpg'),

('3', 'Serengeti Serena Safari Lodge', 'africa', 'tanzania', 'serengeti', 'luxury', 'Stone-built rondavels with infinity pool on an acacia ridge, offering award-winning service and stunning savanna views.', 800, 5, ARRAY['Stone Architecture', 'Infinity Pool', 'Acacia Ridge Location', 'Traditional Design'], '/attached_assets/serena-serengeti-dining-hut_1757883337620.jpg'),

('4', 'Bawe Island Resort', 'africa', 'tanzania', 'zanzibar', 'ultra-luxury', 'Newly opened luxury resort featuring 70 villas with private pools and butler service on a pristine private island setting.', 800, 5, ARRAY['Private Island', 'Butler Service', 'Private Pools', 'Beachfront Location'], '/attached_assets/Bawe island resort_1757883337621.jpg'),

('5', 'Zawadi Hotel Zanzibar', 'africa', 'tanzania', 'zanzibar', 'luxury', 'Adults-only boutique hotel with 12 cliffside villas offering all-inclusive luxury and breathtaking Indian Ocean views.', 600, 5, ARRAY['Adults Only', 'Cliffside Position', 'All Inclusive', 'Ocean Views'], '/attached_assets/Zawadi _1757883337621.jpg'),

('6', 'Park Hyatt Zanzibar', 'africa', 'tanzania', 'zanzibar', 'luxury', 'Award-winning hotel in historic Stone Town with aquamarine sea views, recognized as Best Hotel Interior in Africa.', 500, 5, ARRAY['Stone Town Location', 'Historic Building', 'Sea Views', 'Award Winning'], '/attached_assets/park-hyatt-zanzibar_1757886363985.jpg'),

('7', 'Ngorongoro Crater Lodge', 'africa', 'tanzania', 'ngorongoro', 'ultra-luxury', 'Dramatic luxury lodge perched on crater rim with spectacular views into Africa''s most famous volcanic caldera.', 1200, 5, ARRAY['Crater Rim Location', 'Panoramic Views', 'Luxury Suites', 'Big Five Access'], '/attached_assets/ngorongoro crater lodge_1757886363986.jpg'),

('8', 'Tarangire Safari Lodge', 'africa', 'tanzania', 'tarangire', 'mid-range', 'Comfortable lodge overlooking the Tarangire River with excellent elephant viewing opportunities and traditional architecture.', 400, 4, ARRAY['River Views', 'Elephant Viewing', 'Traditional Architecture', 'Baobab Trees'], '/attached_assets/Tarangire _1757886363987.webp'),

('9', 'Kigelia Ruaha', 'africa', 'tanzania', 'ruaha', 'luxury', 'Remote luxury camp in pristine wilderness setting with exceptional game viewing and walking safari opportunities.', 900, 5, ARRAY['Remote Location', 'Walking Safaris', 'Wilderness Setting', 'Baobab Forest'], '/attached_assets/Spacious-Tents-at-Kigelia-Ruaha_1757886363988.jpg'),

('10', 'Lake Manyara Tree Lodge', 'africa', 'tanzania', 'manyara', 'luxury', 'Unique tree-house style accommodation in the heart of mahogany forest with exclusive access to Lake Manyara National Park.', 750, 5, ARRAY['Tree Houses', 'Forest Location', 'Exclusive Access', 'Tree-Climbing Lions'], '/attached_assets/Manyara lodge_1757886363987.jpg');

-- =============================================
-- SEED: Destinations (16 records)
-- =============================================

INSERT INTO destinations (id, name, continental, country, region, description, highlights, best_time, image_url) VALUES
('1', 'Serengeti National Park', 'africa', 'tanzania', 'northern-circuit', 'Home to the Great Migration and Tanzania''s highest concentration of big cats. Witness millions of wildebeest, zebras, and gazelles in their annual journey across endless plains.', ARRAY['Great Migration', 'Big Five', 'Endless Plains', 'Predator Viewing'], 'June-October (dry season), December-March (calving season)', '/attached_assets/Serengeti _1757885374577.png'),

('2', 'Ngorongoro Conservation Area', 'africa', 'tanzania', 'northern-circuit', 'A UNESCO World Heritage Site featuring the world''s largest inactive volcanic crater with the highest concentration of wildlife in Africa.', ARRAY['Volcanic Crater', 'Big Five', 'UNESCO Site', 'Maasai Culture'], 'Year-round destination with excellent wildlife viewing', '/attached_assets/Ngorongro_1757885374578.png'),

('3', 'Tarangire National Park', 'africa', 'tanzania', 'northern-circuit', 'Famous for massive elephant herds and ancient baobab trees. The Tarangire River attracts diverse wildlife during the dry season.', ARRAY['Elephant Herds', 'Baobab Trees', 'Tarangire River', 'Bird Watching'], 'June-October when animals concentrate along the river', '/attached_assets/Tarangire_1757885374578.png'),

('4', 'Lake Manyara National Park', 'africa', 'tanzania', 'northern-circuit', 'Renowned for its unique tree-climbing lions and diverse ecosystems, from dense rainforest to alkaline lake with flamingo flocks.', ARRAY['Tree-Climbing Lions', 'Flamingos', 'Forest Elephants', 'Great Rift Valley'], 'Year-round, with November-June best for flamingos', '/attached_assets/Manyara_1757885374578.jpg'),

('5', 'Ruaha National Park', 'africa', 'tanzania', 'southern-circuit', 'Tanzania''s largest park with over 12,000 elephants and 10% of the world''s lion population. A truly wild, untouched wilderness experience.', ARRAY['Largest Park', 'Elephant Population', 'Lion Concentration', 'Baobab Forests'], 'June-October dry season for best game viewing', '/attached_assets/Ruaha_1757885374579.jpg'),

('6', 'Zanzibar Island', 'africa', 'tanzania', 'coast', 'Historic Spice Island with pristine beaches, UNESCO Stone Town, and luxury resorts overlooking the Indian Ocean.', ARRAY['Stone Town', 'Spice Tours', 'Pristine Beaches', 'Cultural Heritage'], 'June-October (dry season), December-March (warm season)', '/attached_assets/Zanzibar_1757885374579.jpg'),

('7', 'Mount Kilimanjaro', 'africa', 'tanzania', 'northern-circuit', 'Africa''s highest peak and the world''s tallest free-standing mountain. Experience diverse climate zones from tropical base to arctic summit.', ARRAY['Highest Peak in Africa', 'Diverse Climate Zones', 'Trekking Adventure', 'Uhuru Peak'], 'January-March and June-October for optimal climbing conditions', '/attached_assets/Mount kILIMANAJRO _1757885640431.jpg'),

('8', 'Dar es Salaam', 'africa', 'tanzania', 'coast', 'Tanzania''s largest city and economic hub with vibrant culture, beautiful beaches, and rich Swahili heritage along the Indian Ocean coast.', ARRAY['Economic Hub', 'Swahili Culture', 'Indian Ocean Beaches', 'Modern City Life'], 'June-October (dry season) for comfortable weather', '/attached_assets/Dar es SALAAM_1757885640431.jpg'),

('9', 'Stone Town', 'africa', 'tanzania', 'coast', 'UNESCO World Heritage Site and historic heart of Zanzibar with winding alleys, ornate buildings, and centuries of cultural fusion.', ARRAY['UNESCO Heritage Site', 'Historic Architecture', 'Spice Markets', 'Cultural Fusion'], 'June-October and December-March for pleasant temperatures', '/attached_assets/Stone Town, Znazibar_1757885640432.jpg'),

('10', 'Arusha', 'africa', 'tanzania', 'northern-circuit', 'Gateway to northern Tanzania''s safari circuits and home to Mount Meru, offering stunning views of Kilimanjaro on clear days.', ARRAY['Safari Gateway', 'Mount Meru', 'Coffee Plantations', 'Kilimanjaro Views'], 'June-October (dry season) and December-March', '/attached_assets/Arusha_1757885640432.jpg'),

('11', 'Moshi Town', 'africa', 'tanzania', 'northern-circuit', 'Gateway town to Mount Kilimanjaro with stunning mountain views, vibrant local markets, and rich coffee culture at the foot of Africa''s highest peak.', ARRAY['Kilimanjaro Gateway', 'Coffee Culture', 'Mountain Views', 'Local Markets'], 'January-March and June-October for clear mountain views', '/attached_assets/moshi town_1757886056292.jpg'),

('12', 'Pemba Island', 'africa', 'tanzania', 'coast', 'Pristine spice island with untouched beaches, world-class diving, and authentic Swahili culture away from the crowds of Zanzibar.', ARRAY['Pristine Beaches', 'World-Class Diving', 'Spice Tours', 'Authentic Culture'], 'June-October and December-March for perfect diving conditions', '/attached_assets/Pemba_1757886056293.jpg'),

('13', 'Mount Meru', 'africa', 'tanzania', 'northern-circuit', 'Tanzania''s second-highest mountain and perfect Kilimanjaro warm-up, offering spectacular views and diverse wildlife in Arusha National Park.', ARRAY['Second Highest Peak', 'Kilimanjaro Training', 'Wildlife Viewing', 'Spectacular Views'], 'June-February for optimal climbing conditions', '/attached_assets/Mount mERU_1757886056294.jpg'),

('14', 'Rwanda', 'africa', 'rwanda', 'east-africa', 'Land of a Thousand Hills famous for mountain gorilla trekking, stunning landscapes, and remarkable conservation success stories.', ARRAY['Mountain Gorillas', 'Conservation Success', 'Thousand Hills', 'Volcanoes National Park'], 'June-September and December-February for gorilla trekking', '/attached_assets/Rwanda_1757886056294.jpg'),

('15', 'Kenya', 'africa', 'kenya', 'east-africa', 'Home to the Great Migration''s dramatic river crossings, Big Five wildlife, and the world-renowned Maasai Mara National Reserve.', ARRAY['Great Migration', 'Maasai Mara', 'Big Five', 'River Crossings'], 'July-October for Great Migration river crossings', '/attached_assets/Kenya_1757886056295.jpg'),

('16', 'Uganda', 'africa', 'uganda', 'east-africa', 'The Pearl of Africa with spectacular waterfalls, mountain gorillas, and diverse landscapes from tropical rainforests to savanna plains.', ARRAY['Pearl of Africa', 'Mountain Gorillas', 'Murchison Falls', 'Diverse Landscapes'], 'December-February and June-August for optimal wildlife viewing', '/attached_assets/uganda_1757886056295.jpg');

-- =============================================
-- SEED: Itineraries (12 records)
-- =============================================

INSERT INTO itineraries (id, name, duration, price, category, description, highlights, includes, difficulty, group_size, rating, image_url) VALUES
('1', 'Ngorongoro Day Trip', '1 Day & 0 Nights', 350, 'day-trip', 'Experience the world''s largest inactive volcanic crater in a single day. Witness incredible wildlife density including the Big Five in this natural wonder.', ARRAY['Crater Descent', 'Big Five Viewing', 'Picnic Lunch', 'Cultural Visit'], ARRAY['Transport', 'Park Fees', 'Lunch', 'Guide'], NULL, '2-6 people', 5, '/attached_assets/Ngorongoro_1758798006918.jpg'),

('2', 'Tanzania Wildlife Safari', '7 Days & 6 Nights', 2240, 'classic-safari', 'Comprehensive wildlife experience covering Serengeti, Ngorongoro, and Tarangire. Perfect introduction to Tanzania''s incredible biodiversity and landscapes.', ARRAY['Multiple Parks', 'Migration Viewing', 'Big Five', 'Cultural Experience'], ARRAY['Accommodation', 'All Meals', 'Transport', 'Park Fees', 'Guide'], NULL, '2-8 people', 5, '/attached_assets/Tanzania Widlife Safari_1758798006919.jpg'),

('3', 'Tarangire National Park Daytrip', '1 Day', 250, 'day-trip', 'Explore the land of giants with massive elephant herds and ancient baobab trees in Tanzania''s sixth-largest national park.', ARRAY['Elephant Herds', 'Baobab Trees', 'River Wildlife', 'Bird Watching'], ARRAY['Transport', 'Park Fees', 'Lunch', 'Guide'], NULL, '2-6 people', 5, '/attached_assets/Tarangire_1758798006919.jpg'),

('4', 'Wilderness Escape Safari', '4 Days & 3 Nights', 1720, 'adventure-safari', 'Perfect short safari combining key Northern Circuit parks with excellent wildlife viewing and comfortable accommodations.', ARRAY['Northern Circuit', 'Game Drives', 'Lodge Stays', 'Scenic Landscapes'], ARRAY['Accommodation', 'All Meals', 'Transport', 'Park Fees', 'Guide'], NULL, '2-6 people', 5, '/attached_assets/Wilderness_1758798006919.jpg'),

('5', 'Classic Tanzania Safari: Tarangire, Serengeti & Ngorongoro', '5 Days & 4 Nights', 2420, 'popular', 'Experience Tanzania''s three crown jewels - Tarangire, Serengeti, and Ngorongoro in one incredible journey.', ARRAY['Three Major Parks', 'Great Migration', 'Crater Experience', 'Best Value'], ARRAY['Accommodation', 'All Meals', 'Transport', 'Park Fees', 'Guide'], NULL, '2-8 people', 5, '/attached_assets/Classic TanzaniaTarangire, Serengeti & Ngorongoro_1758798006918.jpg'),

('6', 'Southern Tanzania Safari Escape', '5 Days & 4 Nights', 4610, 'premium', 'Explore the remote Southern Circuit with Ruaha National Park and exclusive luxury accommodations away from crowds.', ARRAY['Southern Circuit', 'Ruaha Park', 'Luxury Lodges', 'Exclusive Experience'], ARRAY['Luxury Accommodation', 'All Meals', 'Transport', 'Park Fees', 'Guide'], NULL, '2-6 people', 5, '/attached_assets/Southern Tanzania Safari Escape_1758798006918.jpg'),

('7', 'Tanzania''s Southern Circuit Experience', '3 Days & 2 Nights', 655, 'explorer', 'Introduction to Tanzania''s Southern Circuit parks with excellent value and authentic wilderness experiences.', ARRAY['Southern Parks', 'Value Experience', 'Wilderness', 'Cultural Encounters'], ARRAY['Accommodation', 'Meals', 'Transport', 'Park Fees', 'Guide'], NULL, '2-6 people', 4, '/attached_assets/Tanzania''s Southern Circuit Experience_1758798006920.jpg'),

('8', 'Oldoinyo Lengai Trekking', '3 Days & 2 Nights', 842, 'trekking', 'Challenging trek up the sacred ''Mountain of God'' - the world''s only active natrocarbonatite volcano.', ARRAY['Active Volcano', 'Sacred Mountain', 'Cultural Experience', 'Challenge Trek'], ARRAY['Camping', 'Meals', 'Transport', 'Guides', 'Equipment'], 'Challenging', '2-8 people', 4, '/attached_assets/lengai_1758798006917.jpg'),

('9', 'Marangu Route', '6 Days & 5 Nights', 1584, 'kilimanjaro', 'The ''Coca-Cola Route'' - Kilimanjaro''s most popular path with comfortable hut accommodations and gradual ascent.', ARRAY['Kilimanjaro Summit', 'Hut Accommodation', 'Popular Route', 'Gradual Ascent'], ARRAY['Hut Accommodation', 'All Meals', 'Guides', 'Porters', 'Equipment'], 'Moderate', '2-12 people', 4, '/attached_assets/Marangu_1758798006916.jpg'),

('10', 'Mount Meru Hiking', '4 Days & 3 Nights', 600, 'hiking', 'Tanzania''s second-highest mountain offering excellent acclimatization for Kilimanjaro and spectacular views.', ARRAY['Mount Meru Summit', 'Acclimatization', 'Wildlife Viewing', 'Crater Views'], ARRAY['Hut Accommodation', 'All Meals', 'Guides', 'Porters'], 'Moderate', '2-8 people', 4, '/attached_assets/Mt Meru Hiking _1758798006917.jpg'),

('11', 'Machame Route', '6 Days & 5 Nights', 1650, 'kilimanjaro', 'The ''Whiskey Route'' - more challenging than Marangu with stunning scenery and higher success rates.', ARRAY['Scenic Route', 'High Success Rate', 'Challenging', 'Diverse Landscapes'], ARRAY['Camping', 'All Meals', 'Guides', 'Porters', 'Equipment'], 'Challenging', '2-12 people', 5, '/attached_assets/Mschame_1758798006917.jpg'),

('12', 'Lemosho Route', '8 Days & 7 Nights', 2090, 'kilimanjaro', 'Considered the most scenic Kilimanjaro route with excellent acclimatization and highest success rates.', ARRAY['Most Scenic', 'Highest Success Rate', 'Best Acclimatization', 'Western Approach'], ARRAY['Camping', 'All Meals', 'Guides', 'Porters', 'Equipment'], 'Challenging', '2-12 people', 5, '/attached_assets/Lemosho_1758798006918.jpg');

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Check data was inserted successfully
SELECT 'Accommodations' as table_name, COUNT(*) as record_count FROM accommodations
UNION ALL
SELECT 'Destinations', COUNT(*) FROM destinations
UNION ALL
SELECT 'Itineraries', COUNT(*) FROM itineraries;

-- =============================================
-- SEED DATA COMPLETE
-- =============================================
-- You now have:
-- - 10 accommodations with prices from $400-$2500
-- - 16 destinations across Tanzania, Kenya, Rwanda, and Uganda
-- - 12 itineraries including safaris, treks, and Kilimanjaro routes
--
-- All records include:
-- ✓ Proper snake_case column names (matching database schema)
-- ✓ Image URLs from /attached_assets/
-- ✓ Arrays for highlights, features, and includes
-- ✓ Correct ratings and pricing
-- =============================================
