export class RampChallenge {
  private url2Val = "";
  private url2Flag = "";
  private urlOne =
    "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";
  constructor() {}

  private async fetchTarget(url: string) {
    return await fetch(url).then(res => res.text());
  }

  private extractMatches(htmlContent: string) {
    return Array.from(
      htmlContent.matchAll(
        /<section\s+[^>]*data-id="92[^"]*"[^>]*>[\s\S]*?<article\s+[^>]*data-class="[^"]*45[^"]*"[^>]*>[\s\S]*?<div\s+[^>]*data-tag="[^"]*78[^"]*[^>]*>[\s\S]*?<b\s+[^>]*class="[^"]*\bref\b[^"]*"[^>]*value="([^"]+)"[^>]*>[\s\S]*?<\/section>/gm
      )
    );
  }

  private solveForUrl2(htmlContent: string) {
    const matches = this.extractMatches(htmlContent);
    const solution = Array.of<string>();
    try {
      matches.forEach(function (match, i) {
        solution.push(match[1]);
      });
    } catch (err) {
      console.error(err);
    } finally {
      return solution.join("");
    }
  }

  private async urlTwoResolved() {
    let secondUrl = "";
    try {
      const getRawHtml = await this.fetchTarget(this.urlOne);
      secondUrl = this.solveForUrl2(getRawHtml);
    } catch (err) {
      if (err instanceof Error) {
        // would throw a new Error in real-world scenarios
        console.error(err.message);
      }
      console.error(err);
    } finally {
      return secondUrl;
    }
  }

  public async captureTheFlag() {
    this.url2Val = await this.urlTwoResolved();
    this.url2Flag = await this.fetchTarget(this.url2Val);
    return { flag: this.url2Flag, url: this.url2Val };
  }
}
// new RampChallenge().captureTheFlag().then((res) => {
//   console.log(res);
// });
