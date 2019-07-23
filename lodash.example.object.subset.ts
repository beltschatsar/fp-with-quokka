import * as _ from "lodash";

interface CodeValuePair {
  code: string;
  value: string; 
};

export class Dummy {
  private static combinationsAllowed4ServiceCode = {
    snowRemoval: [
      // Signs-related problems
      [
        { code: "problem", value: "signs" },
        { code: "signsProblem", value: "noMatchWithMobileApp" }
      ],
      [
        { code: "problem", value: "signs" },
        { code: "signsProblem", value: "delayTooShort" }
      ],
      [
        { code: "problem", value: "signs" },
        { code: "signsProblem", value: "signsStillinPlace" }
      ],
      // Snow-removal-related problems
      [
        { code: "problem", value: "snowClearing" },
        { code: "snowClearingProblem", value: "roadNotCleared" }
      ],
      [
        { code: "problem", value: "snowClearing" },
        { code: "snowClearingProblem", value: "roadPartlyCleared" }
      ],
      [
        { code: "problem", value: "snowClearing" },
        { code: "snowClearingProblem", value: "sidewalkNotCleared" }
      ],
      [
        { code: "problem", value: "snowClearing" },
        { code: "snowClearingProblem", value: "obstructedEntrance" }
      ]
    ],
    slipperyRoadSidewalk: [
      [
        { code: "problem", value: "road" },
        { code: "location", value: "busStop" },
        { code: "magnitude", value: "whereIndicatedOnly" }
      ],
      [
        { code: "problem", value: "road" },
        { code: "location", value: "busStop" },
        { code: "magnitude", value: "wholeSection" }
      ],
      [
        { code: "problem", value: "road" },
        { code: "location", value: "school" },
        { code: "magnitude", value: "whereIndicatedOnly" }
      ],
      [
        { code: "problem", value: "road" },
        { code: "location", value: "school" },
        { code: "magnitude", value: "wholeSection" }
      ],
      [
        { code: "problem", value: "road" },
        { code: "location", value: "hospital" },
        { code: "magnitude", value: "whereIndicatedOnly" }
      ],
      [
        { code: "problem", value: "road" },
        { code: "location", value: "hospital" },
        { code: "magnitude", value: "wholeSection" }
      ],
      [
        { code: "problem", value: "sidewalk" },
        { code: "location", value: "busStop" },
        { code: "magnitude", value: "whereIndicatedOnly" }
      ],
      [
        { code: "problem", value: "sidewalk" },
        { code: "location", value: "busStop" },
        { code: "magnitude", value: "wholeSection" }
      ],
      [
        { code: "problem", value: "sidewalk" },
        { code: "location", value: "school" },
        { code: "magnitude", value: "whereIndicatedOnly" }
      ],
      [
        { code: "problem", value: "sidewalk" },
        { code: "location", value: "school" },
        { code: "magnitude", value: "wholeSection" }
      ],
      [
        { code: "problem", value: "sidewalk" },
        { code: "location", value: "hospital" },
        { code: "magnitude", value: "whereIndicatedOnly" }
      ],
      [
        { code: "problem", value: "sidewalk" },
        { code: "location", value: "hospital" },
        { code: "magnitude", value: "wholeSection" }
      ]
    ]
  };

  public isAttributesValid4ServiceCodeLodash(
    serviceCode: string,
    attributes: Array<CodeValuePair>
  ): boolean {
    const serviceCodeCamelCase = _.camelCase(serviceCode);
    const combinationsAllowed: Array<Array<CodeValuePair>> =
      Dummy.combinationsAllowed4ServiceCode[serviceCodeCamelCase];

    // Ensure that serviceCode is a valid one and attributes is provided...
    if (!combinationsAllowed || !attributes) {
        return false;
    }
    
//    this.aMethod();
    
    // Must provides distinct codes. Otherwise, bizarre case would returns true
    const distinctAttributes = _.uniqWith(attributes, (a, b) => a.code === b.code);
    if (distinctAttributes.length !== attributes.length) {
        return false;
    }

    return !!combinationsAllowed && combinationsAllowed.some(
        (aValidCombination) => _.differenceWith(aValidCombination, attributes, _.isEqual).length === 0
    );
  }

  public isAttributesValid4ServiceCodeArrayOperator(
      serviceCode: string,
      attributes: Array<CodeValuePair>
    ): boolean {
    const serviceCodeCamelCase = _.camelCase(serviceCode);
    const combinationsAllowed: Array<Array<CodeValuePair>> =
      Dummy.combinationsAllowed4ServiceCode[serviceCodeCamelCase];

    // Ensure that serviceCode is a valid one and attributes is provided...
    if (!combinationsAllowed || !attributes) {
        return false;
    }

    // Must provides distinct codes. Otherwise, bizarre case would returns true
    const distinctCodes = new Set(attributes
      .map((value) => `${value.code}¶${value.value}`))
    ;

    if(distinctCodes && distinctCodes.size !== attributes.length) {
      return false;
    }

    return combinationsAllowed.some(
        (aValidCombination) => aValidCombination.length === attributes.length && 
          aValidCombination.some(
            (acceptedCodeValuePair) => attributes.some(
              (providedCodeValuePair) => 
                    providedCodeValuePair.code === acceptedCodeValuePair.code &&
                          providedCodeValuePair.value === acceptedCodeValuePair.value
            )
          )
    );
  }
  private aMethod(): string {
    return 'sdjnsjkn';
  }
}

let dummy = new Dummy();
//const isAttributesValid = dummy.isAttributesValid4ServiceCodeArrayOperator;
const isAttributesValid = dummy.isAttributesValid4ServiceCodeLodash;

//
// FAILURE tests
//

// No params provided
const fail1 = isAttributesValid(undefined, undefined);

// Bad casing for serviceCode
const fail2 = isAttributesValid("snowRemoval", undefined);

// no attributes provided
const fail3 = isAttributesValid("SNOW-REMOVAL", undefined);

// Bad serviceCode
const fail6 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK2", [
  { code: "problem", value: "sidewalk" },
  { code: "location", value: "hospital" },
  { code: "magnitude", value: "wholeSection"}
]);

// code malformed (problem2 instead of problem)
const fail8 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", [
    { code: "problem2", value: "sidewalk" },
    { code: "location", value: "hospital" },
    { code: "magnitude", value: "wholeSection" }
  ]);

// value malformed (sidewalk2 instead of sidewalk)
const fail9 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", [
    { code: "problem", value: "sidewalk2" },
    { code: "location", value: "hospital" },
    { code: "magnitude", value: "wholeSection" }
  ]);

const fail11 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", <any>[]);

const fail12 = isAttributesValid("", <any>[]);

const fail13 = isAttributesValid(undefined, <any>[]);

const fail14 = isAttributesValid(null, <any>[]);

const fail15 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", [
    { code: "problem", value: "sidewalk" },
    { code: "location", value: "hospital" },
  ]);

// Should not supply same code more than once
const fail16 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", [
    { code: "problem", value: "sidewalk" },
    { code: "problem", value: "sidewalk" },
    { code: "location", value: "hospital" },
    { code: "magnitude", value: "wholeSection" },
    { code: "problem", value: "sidewalk" },
    { code: "location", value: "school" },
    { code: "magnitude", value: "whereIndicatedOnly" }
]);

// Extra property "whatEverElse" which is not required here
const fail17 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", [
    { code: "problem", value: "sidewalk" },
    { code: "location", value: "hospital" },
    <any>{ code: "magnitude", value: "wholeSection", whatEverElse: "???" }
]);

// Criss-cross attributes of SLIPPERY-ROAD-SIDEWALK 
const fail18 = isAttributesValid("SNOW-REMOVAL", [
    { code: "problem", value: "sidewalk" },
    { code: "location", value: "hospital" },
    { code: "magnitude", value: "wholeSection" }
]);

// Duplicate of same code
const fail19 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", [
    { code: "problem", value: "sidewalk" },
    { code: "problem", value: "sign" }, // duplicate
    { code: "location", value: "hospital" },
    { code: "magnitude", value: "wholeSection" }
  ]);
    
//
// SUCCESS
//
const success01 = isAttributesValid("SNOW-REMOVAL", [
  { code: "problem", value: "signs" },
  { code: "signsProblem", value: "noMatchWithMobileApp" },
  // extra code/value not related to SNOW-REMOVAL and expected to be ignored
  { code: "magnitude", value: "wholeSection" }
]);

const success02 = isAttributesValid("SNOW-REMOVAL", [
    { code: "problem", value: "signs" },
    { code: "signsProblem", value: "noMatchWithMobileApp" },
]);

const success03 = isAttributesValid("SLIPPERY-ROAD-SIDEWALK", [
    { code: "problem", value: "sidewalk" },
    { code: "location", value: "hospital" },
    { code: "magnitude", value: "wholeSection" }
  ]);

const successXX = isAttributesValid("SNOW-REMOVAL",  [
    { "code": "problem", "value": "snowClearing" },
    { "code": "snowClearingProblem", "value": "roadNotCleared" },
  ]); 



success01;
success02;
success03;
successXX;

fail19;
fail18;
fail17;
fail16;
fail15;
fail14;
fail13;
fail12;
fail11;
fail9;
fail8;
fail6;
fail3;
fail2;
fail1;
