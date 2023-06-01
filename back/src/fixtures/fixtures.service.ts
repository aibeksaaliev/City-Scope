import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Location } from '../locations/location.entity';
import { MainCategory } from '../categories/mainCategory.entity';
import { SubCategory } from '../categories/subCategory.entity';
import { Feedback } from '../feedbacks/feedback.entity';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async dropTables(): Promise<void> {
    await this.userRepository.query(
      'TRUNCATE TABLE "user" RESTART IDENTITY CASCADE',
    );
    await this.locationRepository.query(
      'TRUNCATE TABLE "location" RESTART IDENTITY CASCADE',
    );
    await this.mainCategoryRepository.query(
      'TRUNCATE TABLE "main_category" RESTART IDENTITY CASCADE',
    );
    await this.subCategoryRepository.query(
      'TRUNCATE TABLE "sub_category" RESTART IDENTITY CASCADE',
    );
    await this.feedbackRepository.query(
      'TRUNCATE TABLE "feedback" RESTART IDENTITY CASCADE',
    );
  }

  async createTestDB() {
    const user = await this.userRepository.create({
      email: 'user@gmail.com',
      password: 'password',
    });

    const admin = await this.userRepository.create({
      email: 'admin@gmail.com',
      password: 'password',
      role: 'admin',
    });

    await user.generateToken();
    await admin.generateToken();

    await this.userRepository.save(user);
    await this.userRepository.save(admin);

    const category1 = await this.mainCategoryRepository.create({
      title: 'Food & Beverage',
      image: '/fixtures/food_ic.svg',
    });

    const category2 = await this.mainCategoryRepository.create({
      title: 'Accommodation',
      image: '/fixtures/accommodation_ic.svg',
    });

    const category3 = await this.mainCategoryRepository.create({
      title: 'Beauty Services',
      image: '/fixtures/beauty_ic.svg',
    });

    await this.mainCategoryRepository.save(category1);
    await this.mainCategoryRepository.save(category2);
    await this.mainCategoryRepository.save(category3);

    const subCategory1ToMainCategory1 = await this.subCategoryRepository.create(
      {
        title: 'Restaurants',
        mainCategory: category1,
      },
    );

    const subCategory2ToMainCategory1 = await this.subCategoryRepository.create(
      {
        title: 'Pubs',
        mainCategory: category1,
      },
    );

    const subCategory3ToMainCategory1 = await this.subCategoryRepository.create(
      {
        title: 'Coffee Shops',
        mainCategory: category1,
      },
    );

    const subCategory1ToMainCategory2 = await this.subCategoryRepository.create(
      {
        title: 'Hotels',
        mainCategory: category2,
      },
    );

    const subCategory2ToMainCategory2 = await this.subCategoryRepository.create(
      {
        title: 'Hostels',
        mainCategory: category2,
      },
    );

    const subCategory3ToMainCategory2 = await this.subCategoryRepository.create(
      {
        title: 'Guest Houses',
        mainCategory: category2,
      },
    );

    const subCategory1ToMainCategory3 = await this.subCategoryRepository.create(
      {
        title: 'Barbershops',
        mainCategory: category3,
      },
    );

    const subCategory2ToMainCategory3 = await this.subCategoryRepository.create(
      {
        title: 'Hair Salons',
        mainCategory: category3,
      },
    );

    const subCategory3ToMainCategory3 = await this.subCategoryRepository.create(
      {
        title: 'SPA',
        mainCategory: category3,
      },
    );

    await this.subCategoryRepository.save(subCategory1ToMainCategory1);
    await this.subCategoryRepository.save(subCategory2ToMainCategory1);
    await this.subCategoryRepository.save(subCategory3ToMainCategory1);
    await this.subCategoryRepository.save(subCategory1ToMainCategory2);
    await this.subCategoryRepository.save(subCategory2ToMainCategory2);
    await this.subCategoryRepository.save(subCategory3ToMainCategory2);
    await this.subCategoryRepository.save(subCategory1ToMainCategory3);
    await this.subCategoryRepository.save(subCategory2ToMainCategory3);
    await this.subCategoryRepository.save(subCategory3ToMainCategory3);

    const location1 = await this.locationRepository.create({
      title: 'Capito',
      address: '1/4, Байтик Баатыра улица, Бишкек, 720075, Киргизия',
      coordinates: { lat: '42.8329614811942', lng: '74.60827231407167' },
      description: 'Coffee Shop',
      workingHours: '09:00 - 00:00',
      contacts: '+996 500 00 00 11',
      images: [
        '/fixtures/capito_1.png',
        '/fixtures/capito_2.jpg',
        '/fixtures/capito_2.jpg',
        '/fixtures/capito_3.jpg',
      ],
      logo: '/fixtures/capito_logo.png',
      subCategory: subCategory3ToMainCategory1,
      user: user,
      isApproved: true,
    });

    const location2 = await this.locationRepository.create({
      title: 'Adriano Coffee',
      address: '87, Isanov Street, Бишкек, 720017, Киргизия',
      coordinates: { lat: '42.87556705011888', lng: '74.59202349185945' },
      description: 'Coffee Shop',
      workingHours: '12:00 - 00:00',
      contacts: '+996 777 00 33 11',
      images: ['/fixtures/adriano_1.jpg', '/fixtures/adriano_2.jpg'],
      subCategory: subCategory3ToMainCategory1,
      user: user,
      isApproved: true,
    });

    const location3 = await this.locationRepository.create({
      title: 'Berlin Pub',
      address: `Smokie\'s BBQ, 4/1а, Suyorkulov street, Бишкек, 720075, Киргизия`,
      coordinates: { lat: '42.836962165223305', lng: '74.61430728321682' },
      description: 'Pub',
      workingHours: '12:00 - 02:00',
      contacts: '+996 707 22 00 11',
      images: ['/fixtures/berlin_1.jpg', '/fixtures/berlin_2.jpg'],
      subCategory: subCategory2ToMainCategory1,
      user: user,
      isApproved: true,
    });

    const location4 = await this.locationRepository.create({
      title: 'Pinta',
      address: 'Пинта паб, 13, Аалы Токомбаева улица, Бишкек, 720060, Киргизия',
      coordinates: { lat: '42.81647609022022', lng: '74.62420463562013' },
      description: 'Pub',
      workingHours: '10:00 - 01:00',
      contacts: '+996 555 00 55 11',
      images: [
        '/fixtures/pinta_1.jpg',
        '/fixtures/pinta_2.jpg',
        '/fixtures/pinta_3.jpg',
      ],
      subCategory: subCategory2ToMainCategory1,
      user: user,
      isApproved: true,
    });

    const location5 = await this.locationRepository.create({
      title: 'Iwa',
      address: 'Бишкек Парк, 148, Kiev Street, Бишкек, 720040, Киргизия',
      coordinates: { lat: '42.87468644984395', lng: '74.59076285362245' },
      description: 'Restaurant',
      workingHours: '17:00 - 03:00',
      contacts: '+996 500 55 55 00',
      images: [
        '/fixtures/iwa_1.jpg',
        '/fixtures/iwa_2.jpg',
        '/fixtures/iwa_3.jpg',
        '/fixtures/iwa_4.jpg',
      ],
      subCategory: subCategory1ToMainCategory1,
      user: user,
      isApproved: true,
    });

    const location6 = await this.locationRepository.create({
      title: 'Jannat Regency',
      address: '21/2, Аалы Токомбаева улица, Бишкек, 720028, Киргизия',
      coordinates: { lat: '42.82063522995512', lng: '74.61700558662416' },
      description: 'Hotel',
      workingHours: '24/7',
      contacts: '+996 770 12 21 12',
      images: [
        '/fixtures/jannat_1.jpg',
        '/fixtures/jannat_2.jpg',
        '/fixtures/jannat_3.jpg',
        '/fixtures/jannat_4.jpg',
      ],
      subCategory: subCategory1ToMainCategory2,
      user: user,
      isApproved: true,
    });

    const location7 = await this.locationRepository.create({
      title: 'Hyatt Regency Bishkek',
      address:
        'Хаятт Ридженси Бишкек, 191, Абдрахманова Юсупа улица, Бишкек, 720014, Киргизия',
      coordinates: { lat: '42.879600353285376', lng: '74.61218808163758' },
      description: 'Hotel',
      workingHours: '24/7',
      contacts: '+996 312 00 99 11',
      images: [
        '/fixtures/hyatt_1.jpg',
        '/fixtures/hyatt_2.jpg',
        '/fixtures/hyatt_3.jpg',
      ],
      subCategory: subCategory1ToMainCategory2,
      user: user,
    });

    await this.locationRepository.save(location1);
    await this.locationRepository.save(location2);
    await this.locationRepository.save(location3);
    await this.locationRepository.save(location4);
    await this.locationRepository.save(location5);
    await this.locationRepository.save(location6);
    await this.locationRepository.save(location7);
  }
}
