import { createApp } from './app';
import { singleton } from './lib/singleton';
import { UserService } from './service/UserService';
import { MemoryUserStorage } from './storage/memory/MemoryUserStorage';
import { UserStorage } from './storage/UserStorage';

export const getApp = singleton(() => createApp(getUserService()));

export const getUserService = singleton(() => new UserService(getUserStorage()));

export const getUserStorage = singleton<UserStorage>(() => new MemoryUserStorage());
