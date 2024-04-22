package shared

import (
	"backend/models"
	"sync"
)

type KeyUserStore struct {
	Store map[string]models.User
	mu    sync.RWMutex
}

func (k *KeyUserStore) Set(key string, user models.User) {
	k.mu.Lock()
	defer k.mu.Unlock()
	k.Store[key] = user
}

func (k *KeyUserStore) Get(key string) (models.User, bool) {
	k.mu.RLock()
	defer k.mu.RUnlock()
	user, ok := k.Store[key]
	return user, ok
}

func (k *KeyUserStore) Delete(key string) {
	k.mu.Lock()
	defer k.mu.Unlock()
	delete(k.Store, key)
}

func NewKeyUserStore() *KeyUserStore {
	return &KeyUserStore{
		Store: make(map[string]models.User),
	}
}

var MyKeyStore = NewKeyUserStore()
