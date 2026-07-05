import { PageChrome } from "@/components/site-shell";

export default function IntakePage() {
  return (
    <PageChrome>
      <main className="subpage">
        <div className="wrap">
          <div className="subpage-hero">
            <div>
              <span className="eyebrow">Project intake</span>
              <h1>Start Your Business System</h1>
              <p className="lead">Capture the essentials for a governed PLAN, DISCOVERY, BRAND, DOCS, BUILD, VALIDATE, and RELEASE workflow.</p>
            </div>
          </div>
          <form className="payment-option" action="/api/project/steps" method="post">
            <label>
              Name
              <input name="name" type="text" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <label>
              Business goal
              <textarea name="goal" placeholder="Describe the system you want to build" required />
            </label>
            <label>
              Desired package
              <select name="packageId" defaultValue="growth">
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </label>
            <button className="button button-primary" type="submit">Create Intake Draft</button>
          </form>
        </div>
      </main>
    </PageChrome>
  );
}
