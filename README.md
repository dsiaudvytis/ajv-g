# ajv-g: easily generate ajv schemata
Hopefully.

## Envisioned workflow as of v0.0.1
- Upload a JSON file (drag and drop)
  - Validate it
  - Parse it (infer structure and value types)
- Allow user to select required/optional keys/types
  - ideally, just the child-most node and ajv-g would recursively generate the parents
- Generate ajv schema

### Stretch goals
- match more of the ajv API than just required and type
