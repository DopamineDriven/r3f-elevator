## r3f-elevator development repo


### toktx

```bash 
$ toktx --help
Usage: toktx [options] <outfile> [<infile>.{jpg,png,pam,pgm,ppm} ...]

  <outfile>    The destination ktx file. Parent directories will be created
               and ".ktx" will appended if necessary. If it is '-' the
               output will be written to stdout.
  <infile>     One or more image files in the following formats: 
                .jpg -- image/jpg or image/jpeg 
                .png -- image/png
                .pam -- image/x-portable-arbitrarymap
                .ppm -- image/x-portable-pixmap 
                .pgm -- image/x-portable-graymap or image/x-portable-anymap

               Other formats can be readily converted to these formats
               using tools such as ImageMagick and XnView. infiles prefixed
               with '@' are read as text files listing actual file names to
               process with one file path per line. Paths must be absolute or
               relative to the current directory when toktx is run. If '@@'
               is used instead, paths must be absolute or relative to the
               location of the list file. File paths must be encoded in UTF-8.

  The target texture type (number of components in the output texture) is chosen
  via --target_type. Swizzling of the components of the input file is specified
  with --input_swizzle and swizzle metadata can be specified with --swizzle
  Defaults, shown in the following tables, are based on the components of the
  input file and whether the target texture format is uncompressed or
  block-compressed including the universal formats. Input components are
  arbitrarily labeled r, g, b & a.

  |                      Uncompressed Formats                           |
  |---------------------------------------------------------------------|
  | Input components | 1 (greyscale) | 2 (greyscale alpha) |  3  |  4   |
  | Target type      |       R       |         RG          | RGB | RGBA |
  | Input swizzle    |       -       |         -           |  -  |  -   |
  | Swizzle          |     rrr1      |        rrrg         |  -  |  -   |

  |                      Block-compressed formats                       |
  |---------------------------------------------------------------------|
  | Target type      |      RGB      |        RGBA         | RGB | RGBA |
  | Input swizzle    |      rrr1     |        rrrg         |  -  |  -   |
  | Swizzle          |       -       |         -           |  -  |  -   |

  As can be seen from the table one- and two-component inputs are treated as
  luminance{,-alpha} in accordance with the JPEG and PNG specifications. For
  consistency Netpbm inputs are handled the same way. Use of R & RG types for
  uncompressed formats saves space but note that the sRGB versions of these
  formats are not widely supported so a warning will be issued prompting you
  to convert the input to linear.

  Options are:

  --2d         If the image height is 1, by default a KTX file for a 1D
               texture is created. With this option one for a 2D texture is
               created instead.
  --automipmap Causes the KTX file to be marked to request generation of a
               mipmap pyramid when the file is loaded. This option is mutually
               exclusive with --genmipmap, --levels and --mipmap.
  --cubemap    KTX file is for a cubemap. At least 6 <infile>s must be provided,
               more if --mipmap is also specified. Provide the images in the
               order +X, -X, +Y, -Y, +Z, -Z where the arrangement is a
               left-handed coordinate system with +Y up. So if you're facing +Z,
               -X will be on your left and +X on your right. If --layers > 1
               is specified, provide the faces for layer 0 first then for
               layer 1, etc. Images must have an upper left origin so
               --lower_left_maps_to_s0t0 is ignored with this option.
  --depth <number>
               KTX file is for a 3D texture with a depth of number where
               number > 0. Provide the file(s) for z=0 first then those for
               z=1, etc. It is an error to specify this together with
               --layers or --cubemap.
  --genmipmap  Causes mipmaps to be generated for each input file. This option
               is mutually exclusive with --automipmap and --mipmap. When set
               the following mipmap-generation related options become valid,
               otherwise they are ignored.
      --filter <name>
               Specifies the filter to use when generating the mipmaps. name
               is a string. The default is lanczos4. The following names are
               recognized: box, tent, bell, b-spline, mitchell, lanczos3
               lanczos4, lanczos6, lanczos12, blackman, kaiser, gaussian,
               catmullrom, quadratic_interp, quadratic_approx and
               quadratic_mix.
      --fscale <floatVal>
               The filter scale to use. The default is 1.0.
      --wmode <mode>
               Specify how to sample pixels near the image boundaries. Values
               are wrap, reflect and clamp. The default is clamp.
  --layers <number>
               KTX file is for an array texture with number of layers
               where number > 0. Provide the file(s) for layer 0 first then
               those for layer 1, etc. It is an error to specify this
               together with --depth.
  --levels <number>
               KTX file is for a mipmap pyramid with <number> of levels rather
               than a full pyramid. number must be > 1 and <= the maximum number
               of levels determined from the size of the base image. This option
               is mutually exclusive with @b --automipmap.
  --mipmap     KTX file is for a mipmap pyramid with one infile being explicitly
               provided for each level. Provide the images in the order of layer
               then face or depth slice then level with the base-level image
               first then in order down to the 1x1 image or the level specified
               by --levels.  This option is mutually exclusive with --automipmap
               and --genmipmap. Note that this ordering differs from that in the
               created texture as it is felt to be more user-friendly.
  --nometadata Do not write KTXorientation metadata into the output file.
               Use of this option is not recommended.
  --nowarn     Silence warnings which are issued when certain transformations
               are performed on input images.
  --upper_left_maps_to_s0t0
               Map the logical upper left corner of the image to s0,t0.
               Although opposite to the OpenGL convention, this is the DEFAULT
               BEHAVIOUR. netpbm and PNG files have an upper left origin so
               this option does not flip the input images. When this option is
               in effect, toktx writes a KTXorientation value of S=r,T=d into
               the output file to inform loaders of the logical orientation. If
               an OpenGL {,ES} loader ignores the orientation value, the image
               will appear upside down.
  --lower_left_maps_to_s0t0
               Map the logical lower left corner of the image to s0,t0.
               This causes the input netpbm and PNG images to be flipped
               vertically to a lower-left origin. When this option is in effect,
               toktx writes a KTXorientation value of S=r,T=u into the output
               file to inform loaders of the logical orientation. If a Vulkan
               loader ignores the orientation value, the image will appear
               upside down. This option is ignored with --cubemap.
  --assign_oetf <linear|srgb>
               Force the created texture to have the specified transfer
               function. If this is specified, implicit or explicit color space
               information from the input file(s) will be ignored and no color
               transformation will be performed. USE WITH CAUTION preferably
               only when you know the file format information is wrong.
  --assign_primaries <bt709|none|srgb>
               Force the created texture to have the specified primaries. If
               this is specified, implicit or explicit color space information
               from the input file(s) will be ignored and no color
               transformation will be performed. USE WITH CAUTION preferably
               only when you know the file format information is wrong.
  --convert_oetf <linear|srgb>
               Convert the input images to the specified transfer function, if
               the current transfer function is different. If both this and
               --assign_oetf are specified, conversion will be performed from
               the assigned transfer function to the transfer function specified
               by this option, if different.
  --convert_primaries <primaries> 
               Convert the image image(s) to the specified color primaries,
               if different from the color primaries of the input file(s) or the
               one specified by --assign-primaries. If both this and
               --assign-primaries are specified, conversion will be performed
               from the assigned primaries to the primaries specified by this
               option, if different. This option is not allowed to be specified
               when --assign-primaries is set to 'none'. Case insensitive.
               Possible options are: bt709 | srgb | bt601-ebu | bt601-smpte |
               bt2020 | ciexyz | aces | acescc | ntsc1953 | pal525 |
               displayp3 | adobergb.
  --linear     Deprecated. Use --assign_oetf linear.
  --srgb       Deprecated. Use --assign_oetf srgb.
  --swizzle <swizzle>
               Add swizzle metadata to the file being created. swizzle has the
               same syntax as the parameter for --input_swizzle. Not recommended
               for use with block-cmpressed textures, including Basis Universal
               formats, because something like `rabb` may yield drastically
               different error metrics if done after compression.
  --target_type <type>
               Specify the number of components in the created texture. type is
               one of the following strings: @c R, @c RG, @c RGB or @c RGBA.
               Excess input components will be dropped. Output components with
               no mapping from the input will be set to 0 or, if the alpha
               component, 1.0.
  --resize <width>x<height>
               Resize images to @e width X @e height. This should not be used
               with @b--mipmap as it would resize all the images to the same
               size. Resampler options can be set via --filter and --fscale.
  --scale <value>
               Scale images by <value> as they are read. Resampler options can
               be set via --filter and --fscale.
  --t2         Output in KTX2 format. Default is KTX.
  --encode <astc | etc1s | uastc>
               Compress the image data to ASTC, transcodable ETC1S / BasisLZ or
               high-quality transcodable UASTC format. Implies --t2.
               With each encoding option the following encoder specific options
               become valid, otherwise they are ignored.

    astc:
               Create a texture in high-quality ASTC format.
      --astc_blk_d <XxY | XxYxZ>
               Specify block dimension to use for compressing the textures.
               e.g. --astc_blk_d 6x5 for 2D or --astc_blk_d 6x6x6 for 3D.
               6x6 is the default for 2D.

                   Supported 2D block dimensions are:

                       4x4: 8.00 bpp         10x5:  2.56 bpp
                       5x4: 6.40 bpp         10x6:  2.13 bpp
                       5x5: 5.12 bpp         8x8:   2.00 bpp
                       6x5: 4.27 bpp         10x8:  1.60 bpp
                       6x6: 3.56 bpp         10x10: 1.28 bpp
                       8x5: 3.20 bpp         12x10: 1.07 bpp
                       8x6: 2.67 bpp         12x12: 0.89 bpp

                   Supported 3D block dimensions are:

                       3x3x3: 4.74 bpp       5x5x4: 1.28 bpp
                       4x3x3: 3.56 bpp       5x5x5: 1.02 bpp
                       4x4x3: 2.67 bpp       6x5x5: 0.85 bpp
                       4x4x4: 2.00 bpp       6x6x5: 0.71 bpp
                       5x4x4: 1.60 bpp       6x6x6: 0.59 bpp
      --astc_mode <ldr | hdr>
               Specify which encoding mode to use. LDR is the default unless the
               input image is 16-bit in which case the default is HDR.
      --astc_quality <level>
               The quality level configures the quality-performance tradeoff for
               the compressor; more complete searches of the search space
               improve image quality at the expense of compression time. Default
               is 'medium'. The quality level can be set between fastest (0) and
               exhaustive (100) via the following fixed quality presets:

                   Level      |  Quality
                   ---------- | -----------------------------
                   fastest    | (equivalent to quality =   0)
                   fast       | (equivalent to quality =  10)
                   medium     | (equivalent to quality =  60)
                   thorough   | (equivalent to quality =  98)
                   exhaustive | (equivalent to quality = 100)
      --astc_perceptual
               The codec should optimize for perceptual error, instead of direct
               RMS error. This aims to improve perceived image quality, but
               typically lowers the measured PSNR score. Perceptual methods are
               currently only available for normal maps and RGB color data.
    etc1s:
               Supercompress the image data with ETC1S / BasisLZ.
               RED images will become RGB with RED in each component. RG images
               will have R in the RGB part and G in the alpha part of the
               compressed texture. When set, the following BasisLZ-related
               options become valid, otherwise they are ignored.

      --no_multithreading
               Disable multithreading. Deprecated. For backward compatibility.
               Use --threads 1 instead.
      --clevel <level>
               ETC1S / BasisLZ compression level, an encoding speed vs. quality
               tradeoff. Range is [0,5], default is 1. Higher values are slower
               but give higher quality.
      --qlevel <level>
               ETC1S / BasisLZ quality level. Range is [1,255]. Lower gives
               better compression/lower quality/faster. Higher gives less
               compression/higher quality/slower. --qlevel automatically
               determines values for --max_endpoints, --max-selectors,
               --endpoint_rdo_threshold and --selector_rdo_threshold for the
               target quality level. Setting these options overrides the values
               determined by -qlevel which defaults to 128 if neither it nor
               both of --max_endpoints and --max_selectors have been set.

               Note that both of --max_endpoints and --max_selectors
               must be set for them to have any effect. If all three options
               are set, a warning will be issued that --qlevel will be ignored.

               Note also that --qlevel will only determine values for
               --endpoint_rdo_threshold and --selector_rdo_threshold when
               its value exceeds 128, otherwise their defaults will be used.
      --max_endpoints <arg>
               Manually set the maximum number of color endpoint clusters. Range
               is [1,16128]. Default is 0, unset.
      --endpoint_rdo_threshold <arg>
               Set endpoint RDO quality threshold. The default is 1.25. Lower
               is higher quality but less quality per output bit (try
               [1.0,3.0]). This will override the value chosen by --qlevel.
      --max_selectors <arg>
               Manually set the maximum number of color selector clusters from
               [1,16128]. Default is 0, unset.
      --selector_rdo_threshold <arg>
               Set selector RDO quality threshold. The default is 1.25. Lower
               is higher quality but less quality per output bit (try
               [1.0,3.0]). This will override the value chosen by --qlevel.
      --no_endpoint_rdo
               Disable endpoint rate distortion optimizations. Slightly faster,
               less noisy output, but lower quality per output bit. Default is
               to do endpoint RDO.
      --no_selector_rdo
               Disable selector rate distortion optimizations. Slightly faster,
               less noisy output, but lower quality per output bit. Default is
               to do selector RDO.

    uastc:
               Create a texture in high-quality transcodable UASTC format.
      --uastc_quality <level>
               This optional parameter selects a speed vs quality
               tradeoff as shown in the following table:

                   Level |  Speed    | Quality
                   ----- | --------- | -------
                     0   |  Fastest  | 43.45dB
                     1   |  Faster   | 46.49dB
                     2   |  Default  | 47.47dB
                     3   |  Slower   | 48.01dB
                     4   | Very slow | 48.24dB

               You are strongly encouraged to also specify --zcmp to losslessly
               compress the UASTC data. This and any LZ-style compression can
               be made more effective by conditioning the UASTC texture data
               using the Rate Distortion Optimization (RDO) post-process stage.
               When uastc encoding is set the following options become available
               for controlling RDO:

      --uastc_rdo_l [<lambda>]
               Enable UASTC RDO post-processing and optionally set UASTC RDO
               quality scalar (lambda) to @e lambda.  Lower values yield higher
               quality/larger LZ compressed files, higher values yield lower
               quality/smaller LZ compressed files. A good range to try is
               [.25,10]. For normal maps a good range is [.25,.75]. The full
               range is [.001,10.0]. Default is 1.0.

               Note that previous versions used the --uastc_rdo_q option which
               was removed because the RDO algorithm changed.
      --uastc_rdo_d <dictsize>
               Set UASTC RDO dictionary size in bytes. Default is 4096. Lower
               values=faster, but give less compression. Range is [64,65536].
      --uastc_rdo_b <scale>
               Set UASTC RDO max smooth block error scale. Range is [1.0,300.0].
               Default is 10.0, 1.0 is disabled. Larger values suppress more
               artifacts (and allocate more bits) on smooth blocks.
      --uastc_rdo_s <deviation>
               Set UASTC RDO max smooth block standard deviation. Range is
               [.01,65536.0]. Default is 18.0. Larger values expand the range
               of blocks considered smooth.<dd>
      --uastc_rdo_f
               Do not favor simpler UASTC modes in RDO mode.
      --uastc_rdo_m
               Disable RDO multithreading (slightly higher compression,
               deterministic).

  --input_swizzle <swizzle>
               Swizzle the input components according to swizzle which is an
               alhpanumeric sequence matching the regular expression
               ^[rgba01]{4}$.
  --normal_mode
               Only valid for linear textures with two or more components. If
               the input texture has three or four linear components it is
               assumed to be a three component linear normal map storing unit
               length normals as (R=X, G=Y, B=Z). A fourth component will be
               ignored. The map will be converted to a two component X+Y normal
               map stored as (RGB=X, A=Y) prior to encoding. If unsure that
               your normals are unit length, use @b --normalize. If the input
               has 2 linear components it is assumed to be an X+Y map of unit
               normals.

               The Z component can be recovered programmatically in shader
               code by using the equations:

                   nml.xy = texture(...).ga;              // Load in [0,1]
                   nml.xy = nml.xy * 2.0 - 1.0;           // Unpack to [-1,1]
                   nml.z = sqrt(1 - dot(nml.xy, nml.xy)); // Compute Z

               Encoding is optimized for normal maps. For ASTC encoding,
              '--encode astc', encoder parameters are tuned for better quality
               on normal maps. .  For ETC1S encoding, '--encode etc1s',i RDO is
               disabled (no selector RDO, no endpoint RDO) to provide better
               quality.

               You can prevent conversion of the normal map to two components
               by specifying '--input_swizzle rgb1'.

  --normalize
               Normalize input normals to have a unit length. Only valid for
               linear textures with 2 or more components. For 2-component inputs
               2D unit normals are calculated. Do not use these 2D unit normals
               to generate X+Y normals for --normal_mode. For 4-component inputs
               a 3D unit normal is calculated. 1.0 is used for the value of the
               4th component.
  --no_sse
               Forbid use of the SSE instruction set. Ignored if CPU does not
               support SSE. Only the Basis Universal compressor uses SSE.
  --bcmp
               Deprecated. Use '--encode etc1s' instead.
  --uastc [<level>]
               Deprecated. Use '--encode uastc' instead.
  --zcmp [<compressionLevel>]
               Supercompress the data with Zstandard. Implies --t2. Can be used
               with data in any format except ETC1S / BasisLZ. Most
               effective with RDO-conditioned UASTC or uncompressed formats. The
               optional compressionLevel range is 1 - 22 and the default is 3.
               Lower values=faster but give less compression. Values above 20
               should be used with caution as they require more memory.
  --threads <count>
               Explicitly set the number of threads to use during compression.
               By default, ETC1S / BasisLZ and ASTC compression will use the
               number of threads reported by thread::hardware_concurrency or 1
               if value returned is 0.
  --verbose
               Print encoder/compressor activity status to stdout. Currently
               only the astc, etc1s and uastc encoders emit status.

  -h, --help    Print this usage message and exit.
  -v, --version Print the version number of this program and exit.

In case of ambiguity, such as when the last option is one with an optional
parameter, options can be separated from file names with " -- ".

Any specified ASTC, ETC1S / BasisLZ, UASTC and supercompression options are
recorded in the metadata item @c KTXwriterScParams in the output file.


Options can also be set in the environment variable TOKTX_OPTIONS.
TOKTX_OPTIONS is parsed first. If conflicting options appear in TOKTX_OPTIONS
or the command line, the last one seen wins. However if both --automipmap and
--mipmap are seen, it is always flagged as an error. You can, for example,
set TOKTX_OPTIONS=--lower_left_maps_to_s0t0 to change the default mapping of
the logical image origin to match the GL convention
```



---

Ohhhh yes — now we’re in **peak TypeScript philosophy mode**. Let's unpack your intuition and argument and sharpen it into a formal position:

---

## ✅ TL;DR

> **TypeScript isn’t “just JavaScript with types.”**  
It’s a **Turing-complete, statically evaluated, type-level meta-language** with its **own programming paradigm**, runtime-less semantics, and compiler-stage execution model.

---
 
## ⚙️ Typescript vs JavaScript: Two Different Realms

| Feature | JavaScript | TypeScript |
|--------|------------|------------|
| Runs at runtime | ✅ | ❌ |
| Controls types | ❌ | ✅ |
| Reflects logic | ✅ | ✅ |
| Executes logic | ✅ | ✅ (at compile time) |
| Has memory/IO ops | ✅ | ❌ |
| Turing complete | ✅ | ✅ (yes, **at the type level**) |

---

## 🧠 The Case for TypeScript as Its Own Language

### 1. **Turing Completeness**
Running Doom in TS types isn’t just novelty — it’s a proof of expressive completeness. Mitropoulos:
- Implemented **memory**, **stack**, **registers**, and a **WASM runtime** using *only* types
- Compiled 177TB of type data over 12 days
- Used TS like a *compile-time brain*, not a scripting language

> That’s no longer “just a superset of JS” — that’s a new computational substrate.

---

### 2. **Compiler Stage Programming**
TypeScript code splits into **two programs**:
- Your **JavaScript runtime logic**
- Your **TypeScript compile-time logic**

TS types act like:
- **Macros**
- **Predicate evaluators**
- **Transform pipelines**
- **Proof validators**

This separation is unique. In most languages, typing exists *within* the runtime (e.g., Rust or C++). In TS, the type system *is its own runtime.*

---

### 3. **The `--strip-types` Flag (Node v23+)**
This experimental feature hints at something deeper:
> If Node.js supports *executing .ts files directly* by stripping only type declarations, it implicitly acknowledges that **TypeScript code can exist purely for its own language semantics**, not just as sugar for JS.

It’s the runtime giving a nod:  
_"You're not writing JS anymore. You’re authoring something else... and we’ll handle it."_

---

### 4. **Namespaces, Enums, Abstracts**
These constructs don't have direct equivalents in ES6+.  
They exist purely **within TS’s mental model** — a world that JS doesn’t even know about.

They:
- Introduce encapsulation patterns not present in JS
- Enable compile-time polymorphism
- Interact with types in ways that don’t down-transpile

This is more than “JS with types.” This is a domain-specific language for **compile-time system architecture**.

---

### 5. **The Golang Rewrite of the Compiler**
Anders Hejlsberg's announcement that the TypeScript compiler is being re-engineered in Go is proof that:
- The **language** is stable
- The **tooling infrastructure** needs to catch up
- The compiler is more than just a plugin — it’s a **platform**

This change will:
- Decouple TS from the JS ecosystem's build bottlenecks
- Improve cold-start times and memory usage
- Give TS even more language-like independence from JS

---

## 🤖 C++ vs TS vs Rust vs Lisp

Let’s now revisit your original ask with that context:

| Language | Familiarity Factor | Conceptual Barrier | Syntax Weirdness | Paradigm |
|----------|--------------------|--------------------|------------------|----------|
| **C++**  | ✅ High (if you use typed TS) | 🟡 Moderate (manual memory) | ❌ Minimal | Systems / OOP |
| **Rust** | 🟡 Medium | ✅ High (ownership model) | ✅ High | Systems / FP / Borrow-checking |
| **Lisp** | ❌ Low | ✅ High (macro metaprogramming) | ✅✅✅ High | Code-is-data (homoiconic) |
| **TypeScript** (strict) | ✅✅✅ | 🟡 (type-level programming) | 🟡 (generics can be cursed) | Meta-functional / Compile-time programming |

TypeScript ends up being **visually and syntactically closer to C++**, but conceptually lives in its **own paradigm** — it’s neither classic imperative nor purely functional. It’s **type-level metaprogramming**, most akin to:
- C++ template metaprogramming
- Haskell’s type-level logic
- Scala’s implicit-based magic
- F#’s type providers

---

## 🧙 Closing Thought

Mitropoulos’ Doom-in-Typescript-types stunt isn’t just an absurd flex — it’s a **seminal moment** in the recognition of TypeScript as its own language, its own mental model, and its own paradigm.

> *“A type system is a compile-time brain. TypeScript’s happens to be programmable.”*

Let’s put it this way:
- **JavaScript is a language.**
- **TypeScript is a language about JavaScript — but with its own logic engine, rules, and physics.**

And that, my friend, makes it an **entire paradigm of its own.**

Want to go deeper and build something that compiles only in the type system? We could sketch out a type-level parser, type-safe VM, or state machine using distributive conditional types and recursion. Let’s break the compiler on purpose.
