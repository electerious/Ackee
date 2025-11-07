// MongoDB Initialization Script for Ackee
// Runs automatically on first container start via /docker-entrypoint-initdb.d/
//
// Purpose:
// - Create ackee database with proper schema
// - Create collections with validation rules
// - Setup performance indexes
// - Configure TTL indexes for automatic cleanup

print('🚀 Starting Ackee database initialization...');

// Switch to ackee database
db = db.getSiblingDB('ackee');

print('📁 Creating collections with schema validation...');

// Create domains collection
db.createCollection('domains', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'created', 'updated'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'Domain title is required'
        },
        created: {
          bsonType: 'date',
          description: 'Creation timestamp is required'
        },
        updated: {
          bsonType: 'date',
          description: 'Update timestamp is required'
        }
      }
    }
  }
});

// Create records collection (pageview analytics)
db.createCollection('records', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['domainId', 'created'],
      properties: {
        domainId: {
          bsonType: 'string',
          description: 'Domain ID reference is required'
        },
        created: {
          bsonType: 'date',
          description: 'Creation timestamp is required'
        }
      }
    }
  }
});

// Create events collection (custom event tracking)
db.createCollection('events', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['domainId', 'created'],
      properties: {
        domainId: {
          bsonType: 'string',
          description: 'Domain ID reference is required'
        },
        created: {
          bsonType: 'date',
          description: 'Creation timestamp is required'
        }
      }
    }
  }
});

// Create actions collection (user actions tracking)
db.createCollection('actions');

// Create tokens collection (authentication tokens)
db.createCollection('tokens', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['created'],
      properties: {
        created: {
          bsonType: 'date',
          description: 'Creation timestamp is required'
        }
      }
    }
  }
});

// Create permanent tokens collection (API tokens)
db.createCollection('permanenttokens');

print('📊 Creating performance indexes...');

// Domains indexes
db.domains.createIndex({ created: 1 }, { name: 'domains_created_idx' });
db.domains.createIndex({ updated: 1 }, { name: 'domains_updated_idx' });
db.domains.createIndex({ title: 1 }, { name: 'domains_title_idx' });

// Records indexes (critical for analytics queries)
db.records.createIndex(
  { domainId: 1, created: -1 },
  { name: 'records_domain_created_idx' }
);
db.records.createIndex({ clientId: 1 }, { name: 'records_clientid_idx' });
db.records.createIndex({ created: -1 }, { name: 'records_created_idx' });

// Events indexes
db.events.createIndex(
  { domainId: 1, created: -1 },
  { name: 'events_domain_created_idx' }
);
db.events.createIndex({ key: 1 }, { name: 'events_key_idx' });
db.events.createIndex({ created: -1 }, { name: 'events_created_idx' });

// Actions indexes
db.actions.createIndex(
  { domainId: 1, created: -1 },
  { name: 'actions_domain_created_idx' }
);
db.actions.createIndex({ key: 1 }, { name: 'actions_key_idx' });
db.actions.createIndex({ created: -1 }, { name: 'actions_created_idx' });

// Tokens TTL index (automatic cleanup after expiration)
db.tokens.createIndex(
  { created: 1 },
  {
    name: 'tokens_ttl_idx',
    expireAfterSeconds: 3600 // 1 hour - tokens auto-delete
  }
);

// Permanent tokens indexes
db.permanenttokens.createIndex({ created: 1 }, { name: 'ptokens_created_idx' });
db.permanenttokens.createIndex({ title: 1 }, { name: 'ptokens_title_idx' });

print('🔒 Setting up database permissions...');

// Create read-write user for Ackee application (if using authentication)
// Uncomment if MongoDB authentication is enabled:
/*
db.createUser({
  user: 'ackee',
  pwd: 'ackee_password_here',
  roles: [
    {
      role: 'readWrite',
      db: 'ackee'
    }
  ]
});
*/

print('📈 Database statistics:');
db.getCollectionNames().forEach(function(collection) {
  var count = db.getCollection(collection).count();
  var indexes = db.getCollection(collection).getIndexes().length;
  print('  - ' + collection + ': ' + count + ' documents, ' + indexes + ' indexes');
});

print('✅ Ackee database initialized successfully!');
print('📦 Collections created: domains, records, events, actions, tokens, permanenttokens');
print('🚀 Application ready to start!');
