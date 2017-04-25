# env-prefix-map

Function that:
  * gets all the keys with given prefix
  * removes that prefix
  * (by default) lowercases the keys

## Usage

The function is provided to create map out of env variables. Eg, for env variables:
```
PLAYS_CHELLO='Mark'
PLAYS_VIOLIN='Mary'
PLAYS_GUITAR='Jimmy'
SOME_VARIABLE='x'
```

the call

```
require('env-prefix-map')(process.env, 'PLAYS_');
```

would produce a map of following form:
```
{
    chello: 'Mark',
    violin: 'Mary',
    guitar: 'Jimmy'
}   
```

### Variations:

#### Change keys

One can differentiate the way key is being tranformed (`toLowerCase` by default):

```
require('env-prefix-map')(process.env, 'PLAYS_', {keyFn: k => 'plays ' + k});
```

will produce:
```
{
    'plays chello': 'Mark',
    'plays violin': 'Mary',
    'plays guitar': 'Jimmy'

}
```

#### Change values

You can also transform values:

```
require('env-prefix-map')(process.env, 'PLAYS_', {valueFn: v => v.toUpperCase()});
```

will produce:

```
{
    chello: 'MARK',
    violin: 'MARY',
    guitar: 'JIMMY'
}   
```
